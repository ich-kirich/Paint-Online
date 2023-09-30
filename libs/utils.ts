export default function getScaledPoint(stage: any, scale: any) {
  const { x, y } = stage.getPointerPosition();
  return { x: x / scale, y: y / scale };
};