import { CONTEXT } from "@/libs/constants";
import { IDrawLinesProps } from "@/types/types";
import { useContext } from "react";
import { Group, Line } from "react-konva";

export default function DrawLines(props: IDrawLinesProps) {
  const { line } = props;
  const { scale } = useContext(CONTEXT);
  return (
    <Group>
      <Line
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
    </Group>
  );
}
