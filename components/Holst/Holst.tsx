import { CONTEXT, DEFAULT_ERASER, MODE } from "@/libs/constants";
import {
  IEllipse,
  IDrawElement,
  IText,
  IRect,
  ILine,
  IFilling,
} from "@/types/types";
import { useContext, useRef, useState } from "react";
import { Stage, Layer, Rect, Group, Shape } from "react-konva";
import Konva from "konva";
import styles from "./Holst.module.scss";
import { Box } from "@mui/material";
import DrawLines from "../DrawLines/DrawLines";
import DrawText from "../DrawText/DrawText";
import DrawEllipse from "../DrawEllipse/DrawEllipse";
import DrawRect from "../DrawRect/DrawRect";
import React from "react";
import { getColorPixel, getFillingPixels, getScaledPoint } from "@/libs/utils";
import CurrentElements from "../CurrentElements/CurrentElements";
import DrawElements from "../DrawElements/DrawElements";

export default function Holst() {
  const {
    color,
    setColor,
    drawMode,
    scale,
    width,
    height,
    thickness,
    text,
    fontFamily,
    isCrossText,
    isItalics,
    isBold,
  } = useContext(CONTEXT);

  const [currentLine, setCurrentLine] = useState<ILine | null>(null);
  const [currentText, setCurrentText] = useState<IText | null>(null);
  const [currentEllipse, setCurrentEllipse] = useState<IEllipse | null>(null);
  const [currentRect, setCurrentRect] = useState<IRect | null>(null);
  const [drawElements, setDrawElements] = useState<IDrawElement[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const layerRef = useRef<Konva.Layer>(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (stage) {
      const { x, y } = getScaledPoint(stage, scale);
      setIsDrawing(true);
      switch (drawMode) {
        case MODE.LINE:
        case MODE.PENCIL:
        case MODE.ERASER:
          setCurrentLine({
            points: [x, y],
            color,
            thickness,
            eraser: DEFAULT_ERASER,
          });
          break;
        case MODE.PIPETTE:
          const colorPixel = getColorPixel(stage, layerRef);
          setColor(colorPixel);
          break;
        case MODE.TEXT:
          setCurrentText({
            points: [x, y],
            content: text,
            color,
            fontSize: thickness,
            fontFamily,
            isCrossText,
            isItalics,
            isBold,
          });
          break;
        case MODE.ELLIPSE:
          setCurrentEllipse({
            points: { x, y },
            color,
            thickness,
            startPosition: { x, y },
          });
          break;
        case MODE.RECT:
          setCurrentRect({
            points: { x, y },
            color,
            thickness,
            startPosition: { x, y },
          });
          break;
        case MODE.FILLING:
          const figure = getFillingPixels(stage, layerRef, color);
          setDrawElements([
            ...drawElements,
            {
              type: "filling",
              content: { color: figure.color, points: [...figure.points] },
            },
          ]);
          break;
        default:
          return;
      }
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.buttons === 1 || e.evt.buttons === 2) {
      handleMouseDown(e);
    }

    if (!isDrawing) {
      return;
    }

    const stage = e.target.getStage()!;
    const { x, y } = getScaledPoint(stage, scale);
    if (currentLine || currentEllipse || currentRect) {
      switch (drawMode) {
        case MODE.PENCIL:
          setCurrentLine({
            ...currentLine!,
            points: [...currentLine!.points, x, y],
          });
          break;
        case MODE.LINE:
          const [x0, y0] = currentLine!.points;
          setCurrentLine({
            ...currentLine!,
            points: [x0, y0, x, y],
          });
          break;
        case MODE.ERASER:
          currentLine!.eraser = true;
          setCurrentLine({
            ...currentLine!,
            points: [...currentLine!.points, x, y],
          });
          break;
        case MODE.ELLIPSE:
          setCurrentEllipse({
            ...currentEllipse!,
            points: { x, y },
          });
          break;
        case MODE.RECT:
          setCurrentRect({
            ...currentRect!,
            points: { x, y },
          });
          break;
        default:
          return;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (currentLine) {
      setDrawElements([
        ...drawElements,
        {
          type: "line",
          content: { ...currentLine, points: [...currentLine.points] },
        },
      ]);
      setCurrentLine(null);
    }
    if (currentText) {
      setDrawElements([
        ...drawElements,
        {
          type: "text",
          content: { ...currentText, points: [...currentText.points] },
        },
      ]);
      setCurrentText(null);
    }
    if (currentEllipse) {
      setDrawElements([
        ...drawElements,
        {
          type: "ellipse",
          content: { ...currentEllipse, points: { ...currentEllipse.points } },
        },
      ]);
      setCurrentEllipse(null);
    }
    if (currentRect) {
      setDrawElements([
        ...drawElements,
        {
          type: "rect",
          content: { ...currentRect, points: { ...currentRect.points } },
        },
      ]);
      setCurrentRect(null);
    }
  };

  return (
    <Box className={styles.main__wrapper}>
      <Stage
        width={width * scale}
        height={height * scale}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={styles.main__holst}
      >
        <Layer ref={layerRef}>
          <Rect width={width * scale} height={height * scale} fill="white" />
          <Group>
            <DrawElements drawElements={drawElements} />
            <CurrentElements
              currentText={currentText}
              currentEllipse={currentEllipse}
              currentRect={currentRect}
              currentLine={currentLine}
            />
          </Group>
        </Layer>
      </Stage>
    </Box>
  );
}
