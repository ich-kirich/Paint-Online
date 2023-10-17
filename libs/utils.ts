import Konva from "konva";

export default function getScaledPoint(stage: Konva.Stage, scale: number) {
  const { x, y } = stage.getPointerPosition()!;
  return { x: x / scale, y: y / scale };
}
