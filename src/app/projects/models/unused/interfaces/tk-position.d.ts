/**
 * Genomic Coordinates ala. UCSC/EBI standard.
 */

export interface Coordinate {
  chromosome: string | "chromosome";
  strand: "3'" | "5'";
  basepair: number;
}

export interface Cytogenic {
  chromosome: string | "chromosome";
  cytoband: number;
  position: number;
}

export interface RegionCytogenic {
  chromosome: string | "chromosome";
  chromStart: Cytogenic;
  chromEnd: Cytogenic;
}

export interface Region {
  // add Coords/Cyto choice logic?
  chromosome: string | "chromosome";
  chromStart: Coordinate;
  chromEnd: Coordinate;
}
