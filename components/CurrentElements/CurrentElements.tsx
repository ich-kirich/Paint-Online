import { CONTEXT } from "@/libs/constants";
import { ICurrentElementsProps } from "@/types/types";
import { useContext } from "react";
import { Ellipse, Rect, Line, Text, Group } from "react-konva";

export default function CurrentElements(props: ICurrentElementsProps) {
  const { currentText, currentEllipse, currentRect, currentLine } = props;

  const { scale } = useContext(CONTEXT);

  return (
    <Group>
      {currentText && (
        <Text
          scale={{ x: scale, y: scale }}
          text={currentText.content}
          points={currentText.points}
          x={currentText.points[0] * scale}
          y={currentText.points[1] * scale}
          fontSize={currentText.fontSize}
          fontFamily={currentText.fontFamily}
          fill={currentText.color}
          textDecoration={currentText.isCrossText ? "line-through" : undefined}
          fontStyle={`${currentText.isBold ? "bold " : ""}${
            currentText.isItalics ? "italic" : ""
          }`}
          draggable
        />
      )}
      {currentEllipse && (
        <Ellipse
          scale={{ x: scale, y: scale }}
          x={currentEllipse.startPosition.x * scale}
          y={currentEllipse.startPosition.y * scale}
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
      {currentRect && (
        <Rect
          scale={{ x: scale, y: scale }}
          x={currentRect.startPosition.x * scale}
          y={currentRect.startPosition.y * scale}
          width={currentRect.points.x - currentRect.startPosition.x}
          height={currentRect.points.y - currentRect.startPosition.y}
          stroke={currentRect.color}
          strokeWidth={currentRect.thickness}
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
    </Group>
  );
}
