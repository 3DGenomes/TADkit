/**
 * Biological terms used in TADkit.
 */

type SpeciesCommon =
      "human" | "neanderthal" | "gorilla" | "chimpanzee" | "bonobo"
    | "mouse"
    | "fly"
    | "alien"
    | "unknown"
    ;

type SpeciesScientific = 
      "Homo sapiens" | "Homo neanderthalensis" | "Gorilla gorilla" | "Pan troglodytes" | "Pan paniscus"
    | "Mus musculus"
    | "Drosophila melanogaster"
    | "non-terrestrial"
    | "unknown"
    ;

export interface Species {
    common: SpeciesCommon;
    scientific: SpeciesScientific;
}