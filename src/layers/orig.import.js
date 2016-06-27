				// var colorRange = ["#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff"];
				var colorFilion = ["#227c4f","#e71818","#8ece0d","#6666ff","#424242"];
				// Categorical Color Ragess e.g. d3.scale.category20()
				var colorRange = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];

				// columns to layers
				// skip row 1 = headers ie. length - 2
				// skip colums 1 and 2 = coords ie. length - 3
				var acquiredLayers = [];
				// check for bigwig data the step and start
				// var step = 1; // override below if fixed
				// if none find which is start and end eg. Marie's and Filion's data
				// cycle through first lineto determine columns
				// create as BedGraph
				var headerRow = 0;
				var firstDataRow = 1;
				var startColumn = 0;
				var endColumn = 1;
				var colsCount = data[headerRow].length;

				// Check if fixed steps
				var step = data[firstDataRow][endColumn] - data[firstDataRow][startColumn] + 1; // get step from chromEnd to chromStart
				var step2 = data[firstDataRow+1][endColumn] - data[firstDataRow+1][startColumn] + 1; // check next row
				var type, format, stepType;
				if (step == step2) {
					type = "wiggle_0";
					format = "fixed";
					stepType = "fixed";
				} else {
					type = "bedgraph";
					format = "variable";
					stepType = "variable";
				}

				// Check if Filion proteins ie. chromatin colors
				var filion = false;
				if (colsCount == 7){
					var filionProteins = 0;
					for (var h = 2; h < colsCount; h++) { // h=2 to skip start and end cols
						var header = data[headerRow][h].toLowerCase();
						if (header=="hp1" || header=="brm" || header=="mrg15" || header=="pc" || header=="h1") filionProteins++;
					}
					if (filionProteins == 5) filion = true;
				}

				for (var i = colsCount - 1; i >= 2; i--) { // i >= 2 to skip, start and end columns
					var colored;
					if (filion) {
						colored = colorFilion[i-2];
					} else {
						colored = colorRange[i];
					}				
					acquiredLayers.unshift(
						{
							"metadata": {
								"version" : 1.0,
								"type" : "layer",
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
								"format" : format,
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
							"palette" : [colored,"#cccccc"],
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
						if (format == "variable") {
							acquiredLayers[0].data.unshift({
								"start" : data[j][startColumn],
								"end" : data[j][endColumn],
								"read" : data[j][i]
							});
						} else {
							acquiredLayers[0].data.unshift(data[j][i]);
						}				
					}
				}
				return acquiredLayers;