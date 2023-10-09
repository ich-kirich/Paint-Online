import { IContext } from "@/types/types";
import React from "react";

export const DEFAULT_COLOR = "#000000";

export const DEFAULT_THICKNESS = 2;

export const DEFAULT_ERASER = false;

export const DEFAULT_SIZE_HOLST = {
  WIDTH: 600,
  HEIGHT: 600,
};

export const MODE = {
  PENCIL: "pencil",
  LINE: "line",
  ERASER: "eraser",
};

export const CONTEXT = React.createContext({} as IContext);
