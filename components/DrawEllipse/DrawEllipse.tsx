import { CONTEXT } from "@/libs/constants";
import { IDrawEllipseProps } from "@/types/types";
import { useContext } from "react";
import { Ellipse, Group } from "react-konva";

export default function DrawEllipse(props: IDrawEllipseProps) {
  const { ellipse } = props;
  const { scale } = useContext(CONTEXT);

  return (
    <Group>
      <Ellipse
        scale={{ x: scale, y: scale }}
        x={ellipse.startPosition.x * scale}
        y={ellipse.startPosition.y * scale}
        radiusX={Math.abs(ellipse.points.x - ellipse.startPosition.x)}
        radiusY={Math.abs(ellipse.points.y - ellipse.startPosition.y)}
        stroke={ellipse.color}
        strokeWidth={ellipse.thickness}
      />
    </Group>
  );
}
