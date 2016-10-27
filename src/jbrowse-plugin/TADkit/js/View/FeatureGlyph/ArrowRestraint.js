define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'JBrowse/View/FeatureGlyph/Box'
],
function(
   declare,
   array,
   lang,
   FeatureGlyph
) {
    return declare(FeatureGlyph, {
        _defaultConfig: function() {
            return this._mergeConfigs(dojo.clone(this.inherited(arguments)), {
                style: {
                    color: '#0000ff',
                    opacity: 1,
                    border_color: null,
                    strandArrow: false,
                    marginBottom: 0,
                    height: 10,
                    mouseovercolor: 'rgba(0,0,0,0.1)'
                }
            });
        },
        renderFeature: function(context, fRect) {
            var style = lang.hitch(this, 'getStyle');
            var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
            var r = this.getInfo(fRect.f, fRect.viewInfo.block);
            fRect.rect.t = 0;
            fRect.t = 0;
            fRect.rect.h = fRect.h = this.getStyle( fRect.f, 'height');

                
            var fromy = Math.round(fRect.rect.h/2);
            var toy = fromy;
            var margin_arrow = 2;
            var headlen = 1;
            var angle = Math.atan2(toy-fromy,r.tox-r.fromx);
            
            if(r.fromx > r.tox) {
                margin_arrow = -margin_arrow;
            }
            
            //context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.clearRect(fRect.rect.l, fRect.rect.t, fRect.rect.w, fRect.rect.h);
            
            context.save();
            //context.globalCompositeOperation = 'destination-atop';
            context.beginPath();
            context.globalAlpha = r.opacity;
            
            if(Math.abs(r.tox-r.fromx)>5) {
	            context.moveTo(r.fromx, fromy);
	            context.lineTo(r.tox-margin_arrow, toy);
	            context.strokeStyle = r.color;
	            context.lineWidth = 5;
            

	            context.moveTo(r.tox, toy);
	            context.lineTo(r.tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
	
	            context.lineTo(r.tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));
	
	            context.lineTo(r.tox, toy);
	            context.lineTo(r.tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
	
	            context.strokeStyle = r.color;
	            context.lineWidth = 5;
	            context.stroke();
	            context.fillStyle = r.color;
	            context.fill();
            } else {
            	context.font="20px Georgia";
            	context.fillStyle = r.color;
            	context.fillText(">",r.fromx,toy*2);
            }
            //context.globalCompositeOperation = 'source-over';
            context.restore();
            
                
        },
        getInfo: function(feature, block) {
            var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
            
            var start = block.bpToX(feature.get('start'));
            var end = block.bpToX(feature.get('end'));
            var fid = (feature.id()).substr(0,1);
            var margin_feat = 6;
            if( (parseInt(feature.get('start')) > $scope.settings.current.position && fid=='h') ||
                (parseInt(feature.get('start')) < $scope.settings.current.position && fid=='l')) {
                start = end;
                end = block.bpToX(feature.get('start'));
                margin_feat = -margin_feat;
            }
            return {
            	fromx: start,
                tox: end-margin_feat,
                color: feature.get('color'),
                opacity: feature.get('opacity')
            };
        }
        
    });
});
