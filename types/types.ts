export interface ILines {
  points: number[];
  color: string;
}

export interface IContext {
  color: string;
  setColor: Function;
  drawMode: string;
  setDrawMode: Function;
  scale: number;
  setScale: Function;
}
