import {
  IDrawElementsProps,
  ILine,
  IText,
  IEllipse,
  IFilling,
  IRect,
  IDrawElement,
} from "@/types/types";
import { Group, Shape } from "react-konva";
import DrawEllipse from "../DrawEllipse/DrawEllipse";
import DrawLines from "../DrawLines/DrawLines";
import DrawRect from "../DrawRect/DrawRect";
import DrawText from "../DrawText/DrawText";

export default function DrawElements(props: IDrawElementsProps) {
  const { drawElements } = props;
  return (
    <Group> // switch - case
      {drawElements.map((item: IDrawElement, i: number) => (
        <Group key={i}>
          {item.type === "line" ? (
            <DrawLines line={item.content as ILine} />
          ) : item.type === "text" ? (
            <DrawText text={item.content as IText} />
          ) : item.type === "ellipse" ? (
            <DrawEllipse ellipse={item.content as IEllipse} />
          ) : item.type === "rect" ? (
            <DrawRect rect={item.content as IRect} />
          ) : item.type === "filling" ? (
            <Shape
              sceneFunc={(context, shape) => {
                const { points } = item.content as IFilling;
                for (let index = 0; index < points.length; index += 2) {
                  const x = points[index];
                  const y = points[index + 1];
                  context.fillRect(x, y, 1, 1);
                  context.fillStyle = item.content.color;
                }
                context.fillStrokeShape(shape);
              }}
            />
          ) : null}
        </Group>
      ))}
    </Group>
  );
}
