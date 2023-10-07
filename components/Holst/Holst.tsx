import { CONTEXT, MODE } from "@/libs/constants";
import getScaledPoint from "@/libs/utils";
import { ILines } from "@/types/types";
import { useContext, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import styles from "./Holst.module.scss";

export default function Holst() {
  const { color, drawMode, scale } = useContext(CONTEXT);
  const [currentLine, setCurrentLine] = useState<ILines | null>(null);
  const [lines, setLines] = useState<ILines[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: any) => {
    const stage = e.target.getStage();
    const { x, y } = getScaledPoint(stage, scale);
    isDrawing.current = true;
    setCurrentLine({ points: [x, y], color });
  };

  const handleMouseMove = (e: any) => {
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
    <div>
      <Stage
        width={600 * scale}
        height={600 * scale}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className={styles.main__holst}
      >
        <Layer>
          {lines.map((line: any, i: number) => (
            <Line
              key={i}
              scale={{ x: scale, y: scale }}
              points={line.points}
              stroke={line.color}
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
            />
          ))}
          {currentLine && (
            <Line
              scale={{ x: scale, y: scale }}
              points={currentLine.points}
              strokeWidth={2}
              stroke={currentLine.color}
              tension={0.5}
              lineCap="round"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}
