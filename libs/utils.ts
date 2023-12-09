import { IFilling, IPixels } from "@/types/types";
import Konva from "konva";
import { Context } from "konva/lib/Context";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { MutableRefObject } from "react";
import rgbHex from "rgb-hex";

export function getScaledPoint(stage: Konva.Stage, scale: number) {
  const { x, y } = stage.getPointerPosition()!;
  return { x: x / scale, y: y / scale };
}

export function getColorPixel(stage: Stage, layerRef: React.RefObject<Layer>): string {
  const pointerPosition = stage.getPointerPosition()!;
  const layer = layerRef.current!;
  const pixel = layer
    .getContext()
    .getImageData(pointerPosition.x, pointerPosition.y, 1, 1).data;
  const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  const resultPixelColor = `#${rgbHex(rgbColor)}`;
  return resultPixelColor;
}

export function getFillingPixels(stage: Stage, layerRef: React.RefObject<Layer>, color: string): IFilling {
  const layerFill = layerRef.current!;
  const pointerPositionFill = stage.getPointerPosition()!;
  const context = layerFill.getContext();
  const figure = fillingDraw(
    { x: pointerPositionFill.x, y: pointerPositionFill.y },
    context,
    color,
  );
  return figure;
}

export function validateFileName(fileName: string) {
  const regex = /^[\/\w\-. ]+$/;
  return regex.test(fileName);
};

export function saveFile(stageRef: MutableRefObject<Stage | null>, nameFile: string, selectedType: string) {
  const dataURLWebp = stageRef.current!.toDataURL({
    pixelRatio: 2,
  });
  const linkW = document.createElement("a");
  linkW.href = dataURLWebp;
  linkW.download = `${nameFile}.${selectedType}`;
  linkW.click();
}

export function validateUrl(url: string) {
  const image = new Image();
  image.src = url;
  return image.complete && image.naturalWidth > 0;
}

function fillingDraw(
  pos: { x: number; y: number },
  cx: Context,
  color: string,
): {
  color: string;
  points: number[];
} {
  const imageData = cx.getImageData(0, 0, cx.canvas.width, cx.canvas.height);
  const sample = relativePos(pos);
  const isPaintedSet = new Set();
  const toPaint = [sample];
  const pixelsFigure: IPixels = {
    color,
    points: [],
  };
  while (toPaint.length > 0) {
    const current = toPaint.pop()!;
    const id = `${current.x}-${current.y}`;
    if (isPaintedSet.has(id)) {
      continue;
    } else {
      pixelsFigure.points.push(current!.x, current!.y);
      isPaintedSet.add(id);
    }

    forEachNeighbor(current, function (neighbor: { x: number; y: number }) {
      if (
        neighbor.x >= 0 &&
        neighbor.x < imageData.width &&
        neighbor.y >= 0 &&
        neighbor.y < imageData.height &&
        isSameColor(imageData, sample, neighbor)
      ) {
        toPaint.push(neighbor);
      }
    });
  }
  return pixelsFigure;
}

function forEachNeighbor(point: { x: number; y: number }, fn: Function) {
  fn({ x: point.x - 1, y: point.y });
  fn({ x: point.x + 1, y: point.y });
  fn({ x: point.x, y: point.y - 1 });
  fn({ x: point.x, y: point.y + 1 });
}

function isSameColor(
  data: ImageData,
  point1: { x: number; y: number },
  point2: { x: number; y: number },
) {
  const offset1 = (point1.x + point1.y * data.width) * 4;
  const offset2 = (point2.x + point2.y * data.width) * 4;

  for (let i = 0; i < 4; i++) {
    if (data.data[offset1 + i] != data.data[offset2 + i]) {
      return false;
    }
  }

  return true;
}

function relativePos(pos: { x: number; y: number }) {
  return {
    x: Math.floor(pos.x),
    y: Math.floor(pos.y),
  };
}
