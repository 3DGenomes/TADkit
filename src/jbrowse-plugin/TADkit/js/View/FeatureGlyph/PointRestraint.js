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
                    color: function(feature) {
                        return feature.get('color');
                    },
                    opacity: function(feature) {
                        return feature.get('opacity');
                    },
                    border_color: null,
                    strandArrow: false,
                    marginBottom: 1,
                    mouseovercolor: 'rgba(0,0,0,0.3)'
                }
            });
        },

        renderFeature: function(context, fRect) {
            var style = lang.hitch(this, 'getStyle');
            var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
            fRect.t = 0;
            var r = this.getInfo(fRect.f, fRect.viewInfo.block);
            if (!r) return;
            

                var fromy = Math.round(fRect.rect.h/2);
                var toy = fromy;
                var margin_arrow = 4;
                var headlen = 1;
                var angle = Math.atan2(toy-fromy,r.tox-r.fromx);
                if(r.fromx > r.tox) {
                    margin_arrow = -margin_arrow;
                }
                
                //context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.save();
                context.beginPath();
                context.globalAlpha = style(fRect.f, 'opacity');

                context.moveTo(r.fromx, fromy);
                context.lineTo(r.tox-margin_arrow, toy);
                context.strokeStyle = style(fRect.f, 'color');
                context.lineWidth = 5;
                context.stroke();

                context.beginPath();
                context.moveTo(r.tox, toy);
                context.lineTo(r.tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

                context.lineTo(r.tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

                context.lineTo(r.tox, toy);
                context.lineTo(r.tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

                context.strokeStyle = style(fRect.f, 'color');
                context.lineWidth = 5;
                context.stroke();
                context.fillStyle = style(fRect.f, 'color');
                context.fill();
                context.restore();
            
                
        },
        getInfo: function(feature, block) {
            var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
            
            var start = block.bpToX(feature.get('start'));
            var end = block.bpToX(feature.get('end'));
            var margin_feat = 6;
            if(parseInt(feature.get('start')) > $scope.settings.current.position) {
                start = end;
                end = block.bpToX(feature.get('start'));
                margin_feat = -margin_feat;
            }
            return {
                        fromx: start,
                        tox: end-margin_feat
                    };
        }
        // updateStaticElements: function(a, b, d) {
        //     console.log('shit');
        //                 var c = d.minVisible
        //                   , e = d.maxVisible
        //                   , g = b.viewInfo.block;
        //                 if (g.containsBp(c) || g.containsBp(e)) {
        //                     var h = d.bpToPx
        //                       , g = b.f
        //                       , d = g.get("start")
        //                       , g = g.get("end");
        //                     b.strandArrow && (1 == b.strandArrow && g >= e && d <= e ? this.getEmbeddedImage("plusArrow").then(function(d) {
        //                         a.imageSmoothingEnabled = !1;
        //                         a.drawImage(d, h(e) - h(c) - 9, b.t + (b.rect.h - d.height) / 2)
        //                     }) : -1 == b.strandArrow && d <= c && g >= c && this.getEmbeddedImage("minusArrow").then(function(c) {
        //                         a.imageSmoothingEnabled = !1;
        //                         a.drawImage(c, 0, b.t + (b.rect.h - c.height) / 2)
        //                     }));
        //                     var k = b.label ? b.label.w : 0
        //                       , m = b.description ? b.description.w : 0;
        //                     h(g);
        //                     Math.max(k, m);
        //                     h(c);
        //                     h(d);
        //                     h(c)
        //                 }
        //             }

    });
});
