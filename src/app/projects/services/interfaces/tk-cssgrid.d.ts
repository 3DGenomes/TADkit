/**
 * CSSGrid Template Layout.
 */

export interface GridTemplate {
	areas: string; // e.g. "'area1 area2' 'area3 area4'";
  columns: string; // e.g. "0px 1fr";
  rows: string; // e.g. "50px 1fr 14px";
  gap: number;
}

export interface GridLocation {
  area: string; // e.g. "area1"
  column: string | number; // e.g. "1"
	row: string | number; // e.g. "2 / 3"
}
