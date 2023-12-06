import { TYPES_ELEMENTS } from "@/libs/constants";
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
    <Group>
      {drawElements.map((item: IDrawElement, i: number) => (
        <Group key={i}>
          {(() => {
            switch (item.type) {
              case TYPES_ELEMENTS.LINE:
                return <DrawLines line={item.content as ILine} />;
              case TYPES_ELEMENTS.TEXT:
                return <DrawText text={item.content as IText} />;
              case TYPES_ELEMENTS.ELLIPSE:
                return <DrawEllipse ellipse={item.content as IEllipse} />;
              case TYPES_ELEMENTS.RECT:
                return <DrawRect rect={item.content as IRect} />;
              case TYPES_ELEMENTS.FILLING:
                return (
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
                );
              default:
                return null;
            }
          })()}
        </Group>
      ))}
    </Group>
  );
}
