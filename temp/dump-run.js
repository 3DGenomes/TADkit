	TADkit.run(['$rootScope','$q','loading','TAD','Ensembl', function ($rootScope,$q,loading,TAD,Ensembl) {
		var defer = $q.defer();
		$rootScope.status = 'Ready';
		$q.when(loading.getResult()).then(function(result) {
			// console.log(result);
		});
		$q.all([TAD.loadTAD(),Ensembl.getBiotypeColors()])
		.then(function(result) {
			// TAD
			var metadata = TAD.getMetadata();
			var TADLength = metadata.end - metadata.start;
			result[0].metadata.length = TADLength;
			$rootScope.TAD = result[0];

			// ASSEMBLY
			var defer2 = $q.defer();
			$q.when(Ensembl.getInfoAssembly())
			.then(function(result) {
				$rootScope.assembly = result;
				var assemblyLength = 0;
				var regions = $rootScope.assembly.top_level_region;
				for (var length in regions) {
					if (regions.hasOwnProperty(length)) {
						for (var i = 0, j = regions.length; i < j; i++) {
							assemblyLength += regions[i].length;
						}
					}
				}
				$rootScope.assembly.length = assemblyLength;
				console.log($rootScope.TAD.metadata.species + ": " + parseInt( $rootScope.assembly.length ).toLocaleString() + " BP");
				return defer2;
			});

			// BIOTYPES
			var defer3 = $q.defer();
			$q.when(Ensembl.getInfoBiotypes())
			.then(function(result) {
				$rootScope.biotypes = result;
				return defer3;
			});

			$rootScope.status = 'TAD Loaded';
			console.log($rootScope);
			return defer;
		});
	}])
