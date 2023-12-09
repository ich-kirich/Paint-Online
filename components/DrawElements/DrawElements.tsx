import { CONTEXT, TYPES_ELEMENTS } from "@/libs/constants";
import {
  IDrawElementsProps,
  ILine,
  IText,
  IEllipse,
  IFilling,
  IRect,
  IDrawElement,
  IImage,
} from "@/types/types";
import React from "react";
import { useContext } from "react";
import { Group, Shape, Image } from "react-konva";
import DrawEllipse from "../DrawEllipse/DrawEllipse";
import DrawLines from "../DrawLines/DrawLines";
import DrawRect from "../DrawRect/DrawRect";
import DrawText from "../DrawText/DrawText";
import ImageDraw from "../ImageDraw/ImageDraw";

const DrawElements = React.memo((props: IDrawElementsProps) => {
  const { drawElements } = props;
  const { scale } = useContext(CONTEXT);

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
                    scale={{ x: scale, y: scale }}
                    sceneFunc={(context, shape) => {
                      const { points, color } = item.content as IFilling;
                      for (let index = 0; index < points.length; index += 2) {
                        const x = points[index];
                        const y = points[index + 1];
                        context.fillRect(x, y, 1, 1);
                        context.fillStyle = color;
                      }
                      context.fillStrokeShape(shape);
                    }}
                  />
                );
              case TYPES_ELEMENTS.IMAGE:
                return (
                  <ImageDraw imageUrl={(item.content as IImage).image} />
                );
              default:
                return null;
            }
          })()}
        </Group>
      ))}
    </Group>
  );
});

export default DrawElements;
