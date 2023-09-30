import ILines from "@/types/types";
import { useRef, useState, MouseEvent } from "react";
import { Stage, Layer, Line } from "react-konva";
import styles from "./Holst.module.scss";

export default function Holst() {
  const [lines, setLines] = useState<ILines[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine: ILines = lines[lines.length - 1];
    if (lastLine) {
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
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
          {lines.map((line: any, i: number) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
