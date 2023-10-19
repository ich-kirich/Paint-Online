import { CONTEXT, DEFAULT_ERASER, MODE } from "@/libs/constants";
import getScaledPoint from "@/libs/utils";
import { IEllipse, IDrawElement, ILines, IText } from "@/types/types";
import { useContext, useRef, useState } from "react";
import { Stage, Layer, Rect, Group, Text, Line, Ellipse } from "react-konva";
import Konva from "konva";
import styles from "./Holst.module.scss";
import { Box } from "@mui/material";
import rgbHex from "rgb-hex";
import DrawLines from "../DrawLines/DrawLines";
import DrawText from "../DrawText/DrawText";
import DrawEllipse from "../DrawEllipse/DrawEllipse";

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
  const [drawElements, setDrawElements] = useState<IDrawElement[]>([]);
  const isDrawing = useRef(false);
  const layerRef = useRef<Konva.Layer>(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage()!;
    const { x, y } = getScaledPoint(stage, scale);
    isDrawing.current = true;
    if (
      drawMode === MODE.LINE ||
      drawMode === MODE.PENCIL ||
      drawMode === MODE.ERASER
    ) {
      setCurrentLine({
        points: [x, y],
        color,
        thickness,
        eraser: DEFAULT_ERASER,
      });
    }
    if (drawMode === MODE.PIPETTE && layerRef.current) {
      const pointerPosition = stage.getPointerPosition();
      const layer = layerRef.current;
      const pixel = layer
        .getContext()
        .getImageData(pointerPosition!.x, pointerPosition!.y, 1, 1).data;
      const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      setColor(`#${rgbHex(rgbColor)}`);
    }
    if (drawMode === MODE.TEXT) {
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
    }
    if (drawMode === MODE.ELLIPSE) {
      setCurrentEllipse({
        points: { x, y },
        color,
        thickness,
        strokeWidth: 4,
        startPosition: { x, y },
      });
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
    if (currentLine || currentEllipse) {
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
          {drawElements.map((item: IDrawElement, i: number) => (
            <Group key={i}>
              {item.type === "line" ? (
                <DrawLines line={item.content as ILines} />
              ) : item.type === "text" ? (
                <DrawText text={item.content as IText} />
              ) : item.type === "ellipse" ? (
                <DrawEllipse ellipse={item.content as IEllipse} />
              ) : null}
            </Group>
          ))}
          {currentText && (
            <Text
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
              x={currentEllipse.points.x * scale}
              y={currentEllipse.points.y * scale}
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
        </Layer>
      </Stage>
    </Box>
  );
}
