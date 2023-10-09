export interface ILines {
  points: number[];
  color: string;
  thickness: number;
  eraser: boolean;
}

export interface IContext {
  color: string;
  setColor: Function;
  drawMode: string;
  setDrawMode: Function;
  scale: number;
  setScale: Function;
  width: number;
  setWidth: Function;
  height: number;
  setHeight: Function;
  thickness: number;
  setThickness: Function;
}
