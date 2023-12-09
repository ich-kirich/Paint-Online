import { IContext } from "@/types/types";
import React from "react";

export const DEFAULT_COLOR = "#000000";

export const USER_DEFAULT_COLOR = "#FFFFFF";

export const DEFAULT_THICKNESS = 8;

export const DEFAULT_ERASER = false;

export const DEFAULT_TEXT = "Text";

export const DEFAULT_SIZE_HOLST = {
  WIDTH: 600,
  HEIGHT: 600,
};

export const DEFAULT_COLORS = {
  RED: "#FF4136",
  BLUE: "#0074D9",
  GREEN: "#2ECC40",
  BLACK: "#000",
  YELLOW: "#FFDC00",
  WHITE: "#FFFFFF",
};

export const MODE = {
  PENCIL: "pencil",
  LINE: "line",
  ERASER: "eraser",
  PIPETTE: "pipette",
  TEXT: "text",
  ELLIPSE: "ellipse",
  RECT: "rect",
  FILLING: "filling",
  CURSOR: "cursor",
};

export const MODE_PANEL = {
  MAIN: "main",
  TEXT: "text",
};

export const FONT_FAMILY = {
  ARIAL: "Arial",
  CALIBRI: "Calibri",
  TIMES_NEW_ROMAN: "Times New Roman",
  GEORGIA: "Georgia",
  VERDANA: "Verdana",
  TAHOMA: "Tahoma",
  IMPACT: "Impact",
  PALATINO: "Palatino",
};

export const TYPES_ELEMENTS = {
  LINE: "line",
  TEXT: "text",
  ELLIPSE: "ellipse",
  RECT: "rect",
  FILLING: "filling",
  IMAGE: "image",
};

export const TYPES_FILE = {
  PNG: "png",
  JPG: "jpg",
  JPEG: "jpeg",
  PDF: "pdf",
  WEBP: "webp",
};

export const DEFAULT_SIZE_IMAGE = {
  HEIGHT: 200,
  WIDTH: 200,
};

export const DEFAULT_COLOR_RESIZE = "#ffffff";

export const DEFAULT_STROKE_RESIZE = "#000000";

export const DEFAULT_SCALE = 1;

export const CONTEXT = React.createContext({} as IContext);
