TADkit.directive('tkSlider', function(){
	return {
		restrict:'E',
		scope:{
			data:'=',
			id:'@',
			position:'=',
			fragments:'='
		},
		link:function(scope, elem, attrs){
			
			scope.safeApply = function(fn) {
				var phase = this.$root.$$phase;
				if(phase == '$apply' || phase == '$digest') {
					if(fn && (typeof(fn) === 'function')) { fn(); }
				} else {
				this.$apply(fn);
				}
			};

			function updatePosition (position) {
				scope.safeApply( function (	) {
					scope.position = position;
					// console.log(scope.position);
				})
			}
			
			scope.$watch('data',function(newValue, oldValue){
				if (newValue !== oldValue) {
				
				var data = scope.data;
				var target = scope.id;
				var divWidth = elem[0].parentNode.clientWidth;
				var fragments = scope.fragments
		
				var margin = {top: 0, right: 40, bottom: 0, left: 40},
					width = divWidth - margin.left - margin.right,
					height = 20 - margin.bottom - margin.top,
					trackHeight = 10;

				var x = d3.scale.linear().range([0, width]).clamp(true);

				var sliderStart = 0;
				var sliderEnd = fragments-1;
				// console.log(sliderEnd);

				x.domain([sliderStart, sliderEnd]);
				var handleWidth = Math.max( (width / sliderEnd), 4 );
				// console.log(handleWidth);
				var handleHeight = trackHeight * 2.0;

				var brush = d3.svg.brush()
					.x(x)
					.extent([0, 0])
					.on("brush", brushed);

				var svg = d3.select('#' + target).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				  .append("g");

				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height / 2 + ")")
					.call(d3.svg.axis()
					  .scale(x)
					  .orient("bottom")
					  .outerTickSize([0])
				  )
				  .select(".domain")
				  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
					.attr("class", "halo");

				var slider = svg.append("g")
					.attr("class", "slider")
					.call(brush);

				slider.selectAll(".extent,.resize")
					.remove();

				slider.select(".background")
					.attr("height", height);

				// var handle = slider.append("rect")
				// 	.attr("class", "handle")
				// 	.attr("x", -1.0 * (handleWidth * 0.5) )
				// 	.attr("y", 0)
				// 	.attr("width", handleWidth)
				// 	.attr("height", handleHeight);

				var handle = slider.append("circle")
					.attr("class", "handle")
						.attr("cy", 10)
					.attr("r", handleWidth * 1.6);

				slider
					.call(brush.extent([(scope.position), 0]))
					.call(brush.event);

				function brushed() {
				  var value = brush.extent()[0];

				  if (d3.event.sourceEvent) { // not a programmatic event
					value = x.invert(d3.mouse(this)[0]);
					brush.extent([value, value]);
				  }

				  // handle.attr("x", x(value) - (handleWidth * 0.5));
				  handle.attr("cx", x(value) - (handleWidth * 0.5));
				
					updatePosition(value);
				}
			}
			})
		}
	}
})
			
