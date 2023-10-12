import { CONTEXT, DEFAULT_ERASER, MODE } from "@/libs/constants";
import getScaledPoint from "@/libs/utils";
import { ILines } from "@/types/types";
import { useContext, useRef, useState } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import Konva from "konva";
import styles from "./Holst.module.scss";
import { Box } from "@mui/material";
import rgbHex from "rgb-hex";

export default function Holst() {
  const { color, setColor, drawMode, scale, width, height, thickness } =
    useContext(CONTEXT);
  const [currentLine, setCurrentLine] = useState<ILines | null>(null);
  const [lines, setLines] = useState<ILines[]>([]);
  const isDrawing = useRef(false);
  const layerRef = useRef<Konva.Layer>(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const { x, y } = getScaledPoint(stage, scale);
    isDrawing.current = true;
    setCurrentLine({
      points: [x, y],
      color,
      thickness,
      eraser: DEFAULT_ERASER,
    });
    if (drawMode === MODE.PIPETTE && layerRef.current) {
      const pointerPosition = stage!.getPointerPosition();
      const layer = layerRef.current;
      const pixel = layer
        .getContext()
        .getImageData(pointerPosition!.x, pointerPosition!.y, 1, 1).data;
      const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      setColor(`#${rgbHex(rgbColor)}`);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.buttons === 1 || e.evt.buttons === 2) {
      handleMouseDown(e);
    }
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const { x, y } = getScaledPoint(stage, scale);
    if (currentLine) {
      switch (drawMode) {
        case MODE.PENCIL:
          setCurrentLine({
            ...currentLine,
            points: [...currentLine.points, x, y],
          });
          break;
        case MODE.LINE:
          const [x0, y0] = currentLine.points;
          setCurrentLine({
            ...currentLine,
            points: [x0, y0, x, y],
          });
          break;
        case MODE.ERASER:
          currentLine.eraser = true;
          setCurrentLine({
            ...currentLine,
            points: [...currentLine.points, x, y],
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
      setLines([...lines, { ...currentLine, points: [...currentLine.points] }]);
    }
    setCurrentLine(null);
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
          <Rect
            width={width * scale}
            height={height * scale}
            fill="white"
          />
          {lines.map((line: ILines, i: number) => (
            <Line
              key={i}
              scale={{ x: scale, y: scale }}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.thickness}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.eraser ? "destination-out" : "source-over"
              }
            />
          ))}
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
