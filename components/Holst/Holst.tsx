import { CONTEXT, DEFAULT_ERASER, MODE } from "@/libs/constants";
import {
  IEllipse,
  IDrawElement,
  ILines,
  IText,
  IRect,
  IFillingFigure,
} from "@/types/types";
import { useContext, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect,
  Group,
  Text,
  Line,
  Ellipse,
  Path,
  Shape,
} from "react-konva";
import Konva from "konva";
import styles from "./Holst.module.scss";
import { Box } from "@mui/material";
import rgbHex from "rgb-hex";
import DrawLines from "../DrawLines/DrawLines";
import DrawText from "../DrawText/DrawText";
import DrawEllipse from "../DrawEllipse/DrawEllipse";
import DrawRect from "../DrawRect/DrawRect";
import React from "react";
import { fillingDraw, getScaledPoint } from "@/libs/utils";

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
  const [currentLine, setCurrentLine] = useState<ILines | null>(null);
  const [currentText, setCurrentText] = useState<IText | null>(null);
  const [currentEllipse, setCurrentEllipse] = useState<IEllipse | null>(null);
  const [currentRect, setCurrentRect] = useState<IRect | null>(null);
  const [drawElements, setDrawElements] = useState<IDrawElement[]>([]);
  const isDrawing = useRef(false);
  const layerRef = useRef<Konva.Layer>(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage()!;
    const { x, y } = getScaledPoint(stage, scale);
    isDrawing.current = true;
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
        const pointerPosition = stage.getPointerPosition();
        const layer = layerRef!.current;
        const pixel = layer!
          .getContext()
          .getImageData(pointerPosition!.x, pointerPosition!.y, 1, 1).data;
        const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        setColor(`#${rgbHex(rgbColor)}`);
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
        const layerFill = layerRef.current;
        const pointerPositionFill = stage.getPointerPosition();
        if (pointerPositionFill && layerFill) {
          const context = layerFill.getContext();
          const figure = fillingDraw(
            { x: pointerPositionFill.x, y: pointerPositionFill.y },
            context,
            color,
          );
          setDrawElements([
            ...drawElements,
            {
              type: "filling",
              content: { color, points: [...figure.pixels] },
            },
          ]);
        }
        break;
      default:
        return;
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.buttons === 1 || e.evt.buttons === 2) {
      handleMouseDown(e);
    }
    if (!isDrawing.current) {
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
    isDrawing.current = false;
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
    <Box className={styles.main__holstWrapper}>
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
            {drawElements.map((item: IDrawElement, i: number) => (
              <Group key={i}>
                {item.type === "line" ? (
                  <DrawLines line={item.content as ILines} />
                ) : item.type === "text" ? (
                  <DrawText text={item.content as IText} />
                ) : item.type === "ellipse" ? (
                  <DrawEllipse ellipse={item.content as IEllipse} />
                ) : item.type === "rect" ? (
                  <DrawRect rect={item.content as IRect} />
                ) : item.type === "filling" ? (
                  <Shape
                    sceneFunc={(context, shape) => {
                      const { points } = (item.content as IFillingFigure);
                      for (let index = 0; index < points.length; index += 2) {
                        const x = points[index];
                        const y = points[index + 1];
                        context.fillRect(y, x, 1, 1);
                      }
                      context.fillStrokeShape(shape);
                    }}
                    stroke={item.content.color}
                    strokeWidth={1}
                  />
                ) : null}
              </Group>
            ))}
            {currentText && (
              <Text
                scale={{ x: scale, y: scale }}
                text={currentText.content}
                points={currentText.points}
                x={currentText.points[0] * scale}
                y={currentText.points[1] * scale}
                fontSize={currentText.fontSize}
                fontFamily={currentText.fontFamily}
                fill={currentText.color}
                draggable
              />
            )}
            {currentEllipse && (
              <Ellipse
                scale={{ x: scale, y: scale }}
                x={currentEllipse.startPosition.x * scale}
                y={currentEllipse.startPosition.y * scale}
                radiusX={Math.abs(
                  currentEllipse.points.x - currentEllipse.startPosition.x,
                )}
                radiusY={Math.abs(
                  currentEllipse.points.y - currentEllipse.startPosition.y,
                )}
                stroke={currentEllipse.color}
                strokeWidth={currentEllipse.thickness}
              />
            )}
            {currentRect && (
              <Rect
                scale={{ x: scale, y: scale }}
                x={currentRect.startPosition.x * scale}
                y={currentRect.startPosition.y * scale}
                width={currentRect.points.x - currentRect.startPosition.x}
                height={currentRect.points.y - currentRect.startPosition.y}
                stroke={currentRect.color}
                strokeWidth={currentRect.thickness}
              />
            )}
            {currentLine && (
              <Line
                scale={{ x: scale, y: scale }}
                points={currentLine.points}
                strokeWidth={currentLine.thickness}
                stroke={currentLine.color}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  currentLine.eraser ? "destination-out" : "source-over"
                }
              />
            )}
          </Group>
        </Layer>
      </Stage>
    </Box>
  );
}
