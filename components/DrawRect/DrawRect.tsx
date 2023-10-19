import { CONTEXT } from "@/libs/constants";
import { IDrawRectProps } from "@/types/types";
import { useContext } from "react";
import { Group, Rect } from "react-konva";

export default function DrawRect(props: IDrawRectProps) {
  const { rect } = props;
  const { scale } = useContext(CONTEXT);
  return (
    <Group>
      <Rect
        scale={{ x: scale, y: scale }}
        x={rect.startPosition.x * scale}
        y={rect.startPosition.y * scale}
        width={rect.points.x - rect.startPosition.x}
        height={rect.points.y - rect.startPosition.y}
        stroke={rect.color}
        strokeWidth={rect.thickness}
      />
    </Group>
  );
}
