export interface ILines {
  points: number[];
  color: string;
  thickness: number;
  eraser: boolean;
}

export interface IText {
  content: string;
  points: number[];
  color: string;
  fontSize: number;
  fontFamily: string;
  isCrossText: boolean;
  isItalics: boolean;
  isBold: boolean;
}

export interface IEllipse {
  points: { x: number; y: number };
  color: string;
  strokeWidth: number;
  startPosition: { x: number; y: number };
  thickness: number;
}

export interface IDrawElement {
  type: string;
  content: ILines | IText | IEllipse;
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
  modePanel: string;
  setModePanel: Function;
  text: string;
  setText: Function;
  fontFamily: string;
  setFontFamily: Function;
  isCrossText: boolean;
  setIsCrossText: Function;
  isItalics: boolean;
  setIsItalics: Function;
  isBold: boolean;
  setIsBold: Function;
}

export interface IDrawLinesProps {
  line: ILines;
}

export interface IDrawTextProps {
  text: IText;
}

export interface IThicknessProps {
  minValue: number;
  maxValue: number;
}

export interface IDrawEllipseProps {
  ellipse: IEllipse;
}
