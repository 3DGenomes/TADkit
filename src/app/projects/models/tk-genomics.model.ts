/**
 * General classes for biological terms used in TADkit.
 * Species: Class containing commno and scientific nomenclature.
 */

type SpeciesCommon =
      'human' | 'neanderthal' | 'gorilla' | 'chimpanzee' | 'bonobo'
    | 'mouse'
    | 'fly'
    | 'alien'
    | 'unknown'
    ;

type SpeciesScientific =
      'Homo sapiens' | 'Homo neanderthalensis' | 'Gorilla gorilla' | 'Pan troglodytes' | 'Pan paniscus'
    | 'Mus musculus'
    | 'Drosophila melanogaster'
    | 'non-terrestrial'
    | 'unknown'
    ;

export class Species {
    common: SpeciesCommon;
    scientific: SpeciesScientific;
}
