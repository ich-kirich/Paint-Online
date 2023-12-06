import { IPixels } from "@/types/types";
import Konva from "konva";
import { Context } from "konva/lib/Context";

export function getScaledPoint(stage: Konva.Stage, scale: number) {
  const { x, y } = stage.getPointerPosition()!;
  return { x: x / scale, y: y / scale };
}

export function fillingDraw(
  pos: { x: number; y: number },
  cx: Context,
  color: string,
): {
  color: string;
  pixels: number[];
} {
  const imageData = cx.getImageData(0, 0, cx.canvas.width, cx.canvas.height);
  const sample = relativePos(pos);
  const isPaintedSet = new Set();
  const toPaint = [sample];
  const pixelsFigure: IPixels = {
    color,
    pixels: [],
  };
  while (toPaint.length > 0) {
    const current = toPaint.pop()!;
    const id = `${current.x}-${current.y}`;  
    if (isPaintedSet.has(id)) {
      continue;
    } else {
      pixelsFigure.pixels.push(current!.x, current!.y);
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
