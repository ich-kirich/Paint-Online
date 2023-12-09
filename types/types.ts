import Konva from "konva";
import { MutableRefObject } from "react";

export interface ILine {
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
  startPosition: { x: number; y: number };
  thickness: number;
}

export interface IRect {
  points: { x: number; y: number };
  color: string;
  thickness: number;
  startPosition: { x: number; y: number };
}

export interface IFilling {
  points: number[];
  color: string;
}

export interface IImage {
  image: string;
}

export interface IDrawElement {
  type: string;
  content: ILine | IText | IEllipse | IRect | IFilling | IImage;
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
  stageRef: MutableRefObject<Konva.Stage | null>;
  imageUrl: string;
  setImageUrl: Function;
}

export interface IPixels {
  color: string;
  points: number[];
}

export interface IDrawLinesProps {
  line: ILine;
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

export interface IDrawRectProps {
  rect: IRect;
}

export interface ICurrentElementsProps {
  currentText: IText | null;
  currentEllipse: IEllipse | null;
  currentRect: IRect | null;
  currentLine: ILine | null;
}

export interface IDrawElementsProps {
  drawElements: IDrawElement[];
}

export interface IImageDrawProps {
  imageUrl: string;
}
