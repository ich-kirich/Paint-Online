import { CONTEXT, MODE } from "@/libs/constants";
import { ILines } from "@/types/types";
import { useContext, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import styles from "./Holst.module.scss";

export default function Holst() {
  const { color, drawMode } = useContext(CONTEXT);
  const [currentLine, setCurrentLine] = useState<ILines | null>(null);
  const [lines, setLines] = useState<ILines[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setCurrentLine({ points: [pos.x, pos.y], color });
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return;
    }
    if (currentLine) {
      switch (drawMode) {
        case MODE.PENCIL:
          const stagePencil = e.target.getStage();
          const pointPencil = stagePencil.getPointerPosition();
          setCurrentLine({
            ...currentLine,
            points: [...currentLine.points, pointPencil.x, pointPencil.y],
          });
          break;
        case MODE.LINE:
          const stageLine = e.target.getStage();
          const pointLine = stageLine.getPointerPosition();
          const [x0, y0] = currentLine.points;
          setCurrentLine({
            ...currentLine,
            points: [x0, y0, pointLine.x, pointLine.y],
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
        width={600}
        height={600}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className={styles.main__holst}
      >
        <Layer>
          {currentLine && (
            <Line
              points={currentLine.points}
              strokeWidth={2}
              stroke={currentLine.color}
              tension={0.5}
              lineCap="round"
            />
          )}
          {lines.map((line: any, i: number) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
