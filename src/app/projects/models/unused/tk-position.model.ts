/**
 * Region: Class for specifying data within view of visualization.
 * i.e. genomic coordinates following UCSC/EBI standards.
 */

export class Coordinate {
  chromosome: string | 'chromosome';
  strand: '3\'' | '5\'';
  basepair: number;
}

export class Cytogenic {
  chromosome: string | 'chromosome';
  cytoband: number;
  position: number;
}

export class RegionCytogenic {
  chromosome: string | 'chromosome';
  chromStart: Cytogenic;
  chromEnd: Cytogenic;
}

export class Region {
  // add Coords/Cyto choice logic?
  chromosome: string | 'chromosome';
  chromStart: Coordinate;
  chromEnd: Coordinate;
}

export class Regions extends Array<Region> {}
