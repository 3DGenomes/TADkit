				// var colorRange = ["#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff"];
				var colorFilion = ["#227c4f","#e71818","#8ece0d","#6666ff","#424242"];
				// D3 Categorical Color Ranges
				var colorRange = [];

				if (style.color == "gradient") {
					// ???
				} else { // categorical
					// d3.scale.category20()
					  colorRange.push("#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5");
					// d3.scale.category20b()
					  colorRange.push("#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6");
					// d3.scale.category20c()
					  colorRange.push("#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9");
				}

				// columns to overlays
				// skip row 1 = headers ie. length - 2
				// skip colums 1 and 2 = coords ie. length - 3
				var acquiredOverlays = [];
				// check for bigwig data the step and start
				// var step = 1; // override below if fixed
				// if none find which is start and end eg. Marie's and Filion's data
				// cycle through first lineto determine columns
				// create as BedGraph
				var headerRow = 0;
				var firstDataRow = 1;
				var startColumn = 0;
				var endColumn = 1;
				var rowsCount = data.length;
				var colsCount = data[headerRow].length;

				// Check if fixed steps
				var step = data[firstDataRow][endColumn] - data[firstDataRow][startColumn] + 1; // get step from chromEnd to chromStart
				var step2 = data[firstDataRow+1][endColumn] - data[firstDataRow+1][startColumn] + 1; // check next row
				var stepped = false;
				if (step == step2) stepped = true;

				// Check for data spacing
				var space = data[firstDataRow+1][startColumn] - data[firstDataRow][startColumn];
				var space2 = data[firstDataRow+2][startColumn] - data[firstDataRow+1][startColumn];
				var spaced = false;
				if (space == space2) spaced = true;

				var type, format, stepType;
				var colorSpectrum = [];

				if (stepped && spaced) {
					type = "wiggle_0";
					format = "fixed"; // and if variable...?
					stepType = "fixed";

				} else {
					type = "bedgraph";
					format = "bicolor";
					stepType = "variable";

					// Test values if Boolean or range of values
					for (var f = data.length - 1; f >= 1; f--) {
						var checkValue = data[f][2];
						if (checkValue > 0) {
							if (checkValue >= 1) {
								colorSpectrum.push(colorRange[checkValue]);
								if (checkValue > 1) {
									format = "spectrum";
								}
							}
						}
					}

				}

				/* For bedgraph data, where no value given in col3
				 * assume all indicate peaks/true reads
				 * insert a Boolean value of 1 for each read row
				 */ 
				if (colsCount == 2) {
					// skip first header row
					data[0].push("Peaks");
					for (var g = firstDataRow; g < rowsCount; g++) {
						// add
						data[g].push(1);
					}
					// console.log("No read values - col3 added, all 1 (true).");
					// console.log(data);
				} else {
					// console.log("Read values already included in col3.");
				}

				// Check if Filion proteins ie. chromatin colors
				var filion = false;
				if (colsCount == 7) filion = true; // TEMP validation pending improvement
				if (filion){
					var filionProteins = 0;
					for (var h = 2; h < colsCount; h++) { // h=2 to skip start and end cols
						var header = data[headerRow][h].toLowerCase();
						if (header=="hp1" || header=="brm" || header=="mrg15" || header=="pc" || header=="h1") filionProteins++;
					}
					if (filionProteins == 5) filion = true;
				}

				for (var i = colsCount - 1; i >= 2; i--) { // i >= 2 to skip, start and end columns
					var colored, palette;
					if (filion) {
						colored = colorFilion[i-2];
						palette = [colored,"#cccccc"];
					} else if (format == "spectrum") {
						colored = colorSpectrum;
						palette = colorSpectrum;
					} else {
						colored = colorRange[i];
						palette = [colored,"#cccccc"];
					}				
					acquiredOverlays.unshift(
						{
							"metadata": {
								"version" : 1.0,
								"type" : "overlay",
								"generator" : "TADkit"
							},
							"object" : {
								"uuid" : uuid4.generate(),
								"id" : data[headerRow][i],
								"title" : data[headerRow][i],
								"source" : "Research output",
								"url" : "local",
								"description" : "center_label", //also BigWig description (track title): "User Supplied Track"
								"type" : type, //also BigWig type
								"format" : format, // used to specify track directive (see component.directive.js)
								"components" : 2,
								"name" : data[headerRow][i], //BigWig: "User Track"
								"visibility" : "full", //BigWig: "full", "dense" or "hide"
								"color" : colored, // random from D3.js function. NOTE: convert to RGB for BigWig: eg. 255,255,255
								"altColor" : "#cccccc", // light grey gives best 3D render vis. NOTE: convert to RGB for BigWig: eg. 128,128,128
								"priority" : "100", //BigWig: 100
								"stepType" : stepType, //BigWig: "variable" or "fixed"
								"chrom" : "", //BigWig: derive from dataset...???
								"start" : data[firstDataRow][startColumn], //BigWig
								"step" : step, //BigWig
								"state" : {
									"index" : 0, // make real index???
									"overlaid" : false
								}
							},
							"palette" : palette,
							"data" : [],
							"colors" : {
								"particles" : [],
								"chromatin" : [],
								"network" : {
									"RGB" : [],
									"alpha" : []
								}
							}
						}
					);
					// convert column data to array
					for (var j = data.length - 1; j >= 1; j--) { // j >= 1 to skip first header row
						if (format == "variable" || format == "bicolor" || format == "spectrum") {
							acquiredOverlays[0].data.unshift({
								"start" : data[j][startColumn],
								"end" : data[j][endColumn],
								"read" : data[j][i]
							});
						} else {
							acquiredOverlays[0].data.unshift(data[j][i]);
						}				
					}
				}
				return acquiredOverlays;