import { IContext } from "@/types/types";
import React from "react";

export const DEFAULT_COLOR = "#000000";

export const USER_DEFAULT_COLOR = "#FFFFFF";

export const DEFAULT_THICKNESS = 2;

export const DEFAULT_ERASER = false;

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
};

export const CONTEXT = React.createContext({} as IContext);
