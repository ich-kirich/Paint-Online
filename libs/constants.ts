import { IContext } from "@/types/types";
import React from "react";

export const DEFAULE_COLOR = "#000000";

export const MODE = {
  PENCIL: "pencil",
  LINE: "line",
};

export const SIZE_HOLST = {
  WIDTH: 600,
  HEIGHT: 600,
}

export const CONTEXT = React.createContext({} as IContext);
