import { CONTEXT, MODE } from "@/libs/constants";
import { IDrawTextProps } from "@/types/types";
import { useContext } from "react";
import { Group, Text } from "react-konva";

export default function DrawText(props: IDrawTextProps) {
  const { text } = props;
  const { scale, drawMode } = useContext(CONTEXT);

  const fontStyle = `${text.isBold ? "bold " : ""}${
    text.isItalics ? "italic" : ""
  }`;

  return (
    <Group>
      <Text
        scale={{ x: scale, y: scale }}
        text={text.content}
        x={text.points[0] * scale}
        y={text.points[1] * scale}
        fontSize={text.fontSize}
        fontFamily={text.fontFamily}
        fill={text.color}
        draggable={drawMode === MODE.CURSOR}
        textDecoration={text.isCrossText ? "line-through" : undefined}
        fontStyle={fontStyle}
      />
    </Group>
  );
}
