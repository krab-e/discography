export interface List {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  pos: number;
  limits: any;
}

export interface DiscographyMap {
  [key: string]: string[];
}
