(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Datasets', Datasets);

	function Datasets($q, $http, uuid4, Settings, Resources, Proximities, Restraints, Overlays, Hic_data) {
		var datasets = {
			loaded : [],
			current : {
				index : 0,
				cluster : 1,
				centroid : 1
			}
		};
		var model = {
				"ref":-1, 
				"data":[]
		};
		return {
			load: function(dataUrl, clear) {
				var self = this;
				var deferral = $q.defer();
				
				$http.get(dataUrl)
				.success( function(dataset) {
					dataset.object.filename = dataUrl;
					self.add(dataset);
					deferral.resolve(datasets);
				});
				return deferral.promise;
			},
			add: function(data) {
				var self = this;
				var dataset = self.validate(data);
				// var uuid = dataObj.uuid || uuid4.generate(),
				// if (!projects.default.datasets[uuid]) {
					datasets.loaded.push(dataset);
					datasets.current.index = datasets.loaded.length - 1;
					self.setSpeciesUrl();
					self.setRegion();
					self.init(dataset);
					console.log("Dataset " + dataset.object.species + " " + dataset.object.region + " loaded from file.");
				// }
				return datasets;
			},
			validate: function(data) {
				var validDataset = {};
				var objectType = Resources.whatIsIt(data);
				if (objectType === "String") {
					validDataset = JSON.parse(data);
				} else {
					// TODO: add specific options for Array, Object, null, etc.
					validDataset = data;
				}
				var validation = true;
				// ADD VALIDATION LOGIC...
				// check structure
				// check content type
				if (validation) {
					return validDataset;
				} else {
					// give error message
					// return to Project Loader page
				}
			},
			init: function(dataset) {
				var self = this;
				if(dataset.centroids.length===0) {
					for (var m = 0; m < dataset.models.length; m++) {
						dataset.centroids.push(dataset.models[m].ref);
						dataset.clusters.push([dataset.models[m].ref]);
					}
				}
				var currentModel = self.getModel();
				Settings.set(dataset);
				if(typeof currentModel !== 'undefined') {
					Proximities.set(currentModel.data);
					Restraints.set(currentModel.data, dataset.restraints);
					Overlays.update(Proximities.get().distances, dataset.restraints);
				}
				if(!angular.isUndefined(dataset.hic_data)) {
					var chromosomeIndex = 0;
					if (dataset.object.chromosomeIndex) {
						chromosomeIndex = dataset.object.chromosomeIndex;	
					}
					var offset=0;
					var resolution = dataset.object.resolution;
					for(var i=0;i<chromosomeIndex;i++) offset += Math.round(dataset.object.chromEnd[l]/resolution)-Math.round(dataset.object.chromStart[l]/resolution)+1; 
					
					var posStart = (dataset.object.chromStart[chromosomeIndex]/resolution + offset)-dataset.object.chromStart[0]/resolution;
					var posEnd = (dataset.object.chromEnd[chromosomeIndex]/resolution + offset)-(dataset.object.chromStart[0]/resolution);
					Hic_data.set(dataset.hic_data,[Math.round(posStart+1)],[Math.round(posEnd+1)]);
					
				} else Hic_data.clear();
				
				// if (dataset.object.filename) {
				//	var filetype = "tsv";
				//	var resetToDefaults = true;
				//	Overlays.loadTSV(dataset.object.filename, filetype, resetToDefaults);	
				// }
				console.log("Settings, Proximities, Restraints & Overlays initialized.");
			},
			clear: function() {
				while (datasets.loaded.length > 0) {
					datasets.loaded.shift();
				}
			},
			remove: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded.indexOf(index);
				datasets.loaded.splice(dataset, 1);
				return datasets;
			},
			getSpecies: function(index) {
				if(typeof datasets.loaded[index].object.species === 'undefined' && typeof datasets.loaded[index].object.taxon_id !== 'undefined') {
					var dataUrl = "https://www.ebi.ac.uk/ena/data/taxonomy/v1/taxon/tax-id/"+ datasets.loaded[index].object.taxon_id;
				    return $http({method:"GET", url:dataUrl}).then(function(result){
				       console.log('Retrieved species ' + result.data.scientificName + ' from taxon_id '+datasets.loaded[index].object.taxon_id);
				       return result.data.scientificName;
				    });    
				} else {
					return datasets.loaded[index].object.species;
				}
			},
			setSpeciesUrl: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var species,speciesUrl;
				var mygetSpecie = this.getSpecies(index);
				if(typeof datasets.loaded[index].object.species !== 'undefined') {
					speciesUrl = datasets.loaded[index].object.species.replace(/[^a-z0-9]/gi, '_').toLowerCase();
					datasets.loaded[index].object.speciesUrl = speciesUrl;
					return speciesUrl;
				} else {
					mygetSpecie.then(function(scientificName) {  
				    	datasets.loaded[index].object.species = scientificName;
						speciesUrl = scientificName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
						datasets.loaded[index].object.speciesUrl = speciesUrl;
						return speciesUrl;
				     });
				}
			},
			setRegion: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var chromosomeIndex = 0;
				if (datasets.loaded[index].object.chromosomeIndex) {
					chromosomeIndex = datasets.loaded[index].object.chromosomeIndex;	
				}
				var chrom = datasets.loaded[index].object.chrom[chromosomeIndex];
				var chromStart = datasets.loaded[index].object.chromStart[chromosomeIndex];
				var chromEnd = datasets.loaded[index].object.chromEnd[chromosomeIndex];
				
				var region = chrom + ":" + chromStart + "-" + chromEnd;
				datasets.loaded[index].object.region = region;
				return region;
			},
			set: function(index) {
				if (index !== undefined || index !== false) datasets.current.index = index;
				this.setCluster(datasets.current.cluster); // need to determine which cluster is current?
				var dataset = datasets.loaded[datasets.current.index];
				return dataset;
			},
			setCluster: function(ref) { // from cluster ref
				ref = ref || 1; // from ref or just set as the first cluster
				datasets.current.cluster = ref;
				var clusterCentroid = this.getCentroid(datasets.current.cluster);
				this.setCentroid(clusterCentroid);
				var cluster = this.getCluster();
				return cluster; // array of model indices
			},
			setCentroid: function(ref) { // from model ref
				ref = ref || this.getCentroid(); // from ref or from current cluster
				datasets.current.centroid = ref;
				var centroid = this.setModel(datasets.current.centroid);
				return centroid; // array of vertices
			},
			setModel: function(ref,chromosomeIndex) { // from model ref
				ref = ref || this.getCentroid();
				var model = this.getModel(ref - 1,chromosomeIndex);
				// Store as current model for dataset in datasets.loaded[datasets.current.index].data
				datasets.loaded[datasets.current.index].data = model;
				return model; // array of vertices
			},
			get: function() {
				return datasets;
			},
			getDataset: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded[index];
				return dataset;
			},
			getCluster: function(ref) { // from cluster ref
				ref = ref || datasets.current.cluster;
				var cluster = datasets.loaded[datasets.current.index].clusters[ref - 1];
				return cluster; // array of model refs
			},
			getClusterId: function() { 
				return datasets.current.cluster;
			},
			getCentroid: function(ref) { // from cluster ref (NOT model ref)
				ref = ref || datasets.current.cluster;
				var centroid = datasets.loaded[datasets.current.index].centroids[ref - 1];
				return centroid; // single model ref
			},
			getModel: function(ref, chromosomeIndex) { // from model ref
				var self = this;
				ref = ref || this.getCentroid();
				var dataset = self.getDataset();
				var settings = Settings.get();
				if (chromosomeIndex === undefined || chromosomeIndex === false) chromosomeIndex = [dataset.object.chrom[0]];
				
				var chromIdx;
				var chromStart = [];
				var chromEnd = [];
				var resolution = dataset.object.resolution;
				var offset = 0;
				for (var l = 0 ; l < dataset.object.chrom.length; l++) {
					chromIdx = chromosomeIndex.indexOf(dataset.object.chrom[l]);
					if(chromIdx > -1) {
						chromStart.push(Math.round((dataset.object.chromStart[l]-dataset.object.chromStart[0])/resolution)+offset);
						chromEnd.push(Math.round((dataset.object.chromEnd[l]-dataset.object.chromStart[0])/resolution)+1+offset);
					}
					offset += Math.round(dataset.object.chromEnd[l]/resolution)-Math.round(dataset.object.chromStart[l]/resolution)+1;
				}
				
				var models = datasets.loaded[datasets.current.index].models;
				model.data = [];
				// console.log(ref);
				for (var i = models.length - 1; i >= 0; i--) {
					if (models[i].ref == ref) {
						for (var k = 0 ; k < chromStart.length; k++) {
							for (var j = dataset.object.components*(chromStart[k]) ; j < dataset.object.components*(chromEnd[k]); j += 3) {
								model.data.push(models[i].data[j],models[i].data[j+1],models[i].data[j+2]);
							}
						}
					}
				}
				// console.log(model);
				model.ref = ref;
				return model; // array of model vertices
			},
			loadHic: function() {
				var dataset = this.getDataset();
				return Hic_data.loadExternal(dataset);
			},
			parse: function(data) {
				Papa.DefaultDelimiter = " ";
				var parsedData = Papa.parse(data,{
					dynamicTyping: true,
					skipEmptyLines: true,
					fastMode: true
				});
				return parsedData;
			},
			import: function(fileData, skipRows, bp_per_nm, selectedCols) {
				var self = this;
				// TODO: if not valid fileData return...
				skipRows = skipRows || 0;
				selectedCols = selectedCols || [];

				var parsedData;
				var dataType = Resources.whatIsIt(fileData);
				if (dataType == "String") {
					parsedData = self.parse(fileData).data;
				} else {
					parsedData = fileData; // already parsed to JSON object
				}

				var dataset = datasets.loaded[datasets.current.index];
				var settings = Settings.get();
				var chromosomeIndex = settings.current.chromosomeIndexes;
				var resoData = 1;
				var importedCoords = 0;
				var resolution = settings.current.segmentLength*settings.current.particleSegments;
				var cur_model,offset;
				var i,j,k;
				
				if(dataset.models.length>0) {
					var ref = this.getCentroid();
					for (i = dataset.models.length - 1; i >= 0; i--) {
						if (dataset.models[i].ref == ref) {
							cur_model = dataset.models[i];
							break;
						}
					}
					for (j = 0; j < cur_model.data.length; j++) {
						cur_model.data[j] = 0;
					}
				} else {
					cur_model = {"ref": 1,"data": [] };
					offset = 0;
					for (i = 0 ; i < dataset.object.chrom.length; i++) {
						offset += Math.round(dataset.object.chromEnd[i]/resolution)-Math.round(dataset.object.chromStart[i]/resolution)+1;
					}
					for (j = 0; j < offset; j++) {
						cur_model.data.push(0,0,0);
					}
					dataset.models.push(cur_model);
					dataset.centroids.push(1);
					dataset.clusters.push([1]);
					datasets.current.centroid = 1;
					datasets.current.cluster = 1;
				}
				var scale = bp_per_nm / 0.01;
				var pos,x,y,z,nb,startb,endb,chr_bins;
				offset = 0;
				
				for (i = 0 ; i < dataset.object.chrom.length; i++) {
					chr_bins = Math.round(dataset.object.chromEnd[i]/resolution)-Math.round(dataset.object.chromStart[i]/resolution)+1;
					for (j = 0; j < 3*chr_bins; j+=3) {
						startb = (dataset.object.chromStart[i]-resolution)+(j/3)*resolution;
						endb = startb + resolution;
						k = skipRows;
						while(true) {
							if(k>=parsedData.length) break;
							nb = 0;
							x = y = z = 0;
							while ( (dataset.object.chrom[i] == parsedData[k][0].toString() || dataset.object.chrom[i] == parsedData[k][0].toString().replace('chr','')) && 
									(parsedData[k][1]*resoData>=startb) && 
						    		(parsedData[k][1]*resoData<endb) 
						    ) {
								
								x += parsedData[k][2];
						    	y += parsedData[k][3];
						    	z += parsedData[k][4];
						    	nb++;
						    	if(k>=parsedData.length-1) break;
						    	k++;
								
						    }
							if(nb>0) {
								cur_model.data[j+3*offset] = scale * Math.round(x/nb);
						    	cur_model.data[j+3*offset+1] = scale * Math.round(y/nb);
						    	cur_model.data[j+3*offset+2] = scale * Math.round(z/nb);	
								importedCoords++;
								break;
							}
							k++;
							
						}
						
					}
					offset += chr_bins;
				}
				
				
				

				return importedCoords;
			},
/*			parse: function(indata) {
				// split content based on new line
			    var allTextLines = indata.split(/\r\n|\n/);
			    var headers = allTextLines[0].split(',');
			    var lines = [];

			    for ( var i = 0; i < allTextLines.length; i++) {
			        // split content based on comma
			        var data = allTextLines[i].split(',');
			        if (data.length == headers.length) {
			            var tarr = [];
			            for ( var j = 0; j < headers.length; j++) {
			                tarr.push(data[j]);
			            }
			            lines.push(tarr);
			        }
			    }
			    return lines;
			},*/
		};
	}
})();
