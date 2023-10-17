import { IDrawTextProps } from "@/types/types";
import { Group, Text } from "react-konva";

export default function DrawText(props: IDrawTextProps) {
  const { text } = props;

  const fontStyle = `${text.isBold ? "bold " : ""}${
    text.isItalics ? "italic" : ""
  }`;
  return (
    <Group>
      <Text
        text={text.content}
        x={text.points[0]}
        y={text.points[1]}
        fontSize={text.fontSize}
        fontFamily={text.fontFamily}
        fill={text.color}
        draggable
        onDblClick={() => (text.content = "")}
        textDecoration={text.isCrossText ? "line-through" : undefined}
        fontStyle={fontStyle}
      />
    </Group>
  );
}
