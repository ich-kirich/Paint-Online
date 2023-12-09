import { CONTEXT, DEFAULT_COLOR_RESIZE, DEFAULT_SIZE_IMAGE, DEFAULT_STROKE_RESIZE, MODE } from "@/libs/constants";
import { IImageDrawProps } from "@/types/types";
import Konva from "konva";
import { useContext, useEffect, useRef, useState } from "react";
import { Group, Image, Rect } from "react-konva";
import useImage from "use-image";

export default function ImageDraw(props: IImageDrawProps) {
  const { imageUrl } = props;
  const { scale, setImageUrl, drawMode } = useContext(CONTEXT);
  const [image] = useImage(imageUrl);
  const [imageSize, setImageSize] = useState({
    width: DEFAULT_SIZE_IMAGE.WIDTH,
    height: DEFAULT_SIZE_IMAGE.HEIGHT,
  });

  const imageRef = useRef<Konva.Image>(null);
  const rectRef = useRef<Konva.Rect>(null);

  const handleCornerDragMove = () => {
    const imageNode = imageRef.current!;
    const stage = imageNode.getStage()!;
    const pointerPos = stage.getPointerPosition()!;
    const newWidth = pointerPos.x - imageNode.x();
    const newHeight = pointerPos.y - imageNode.y();
    setImageSize({ width: newWidth, height: newHeight });
  };

  const handleImageDragMove = () => {
    const imageNode = imageRef.current!;
    const rectNode = rectRef.current!;

    const imagePos = imageNode.position();
    rectNode.position({
      x: imagePos.x + imageSize.width,
      y: imagePos.y + imageSize.height,
    });
  };

  useEffect(() => {
    setImageUrl("");
  },[])

  return (
    <Group>
      {image && (
        <Group>
          <Image
            scale={{ x: scale, y: scale }}
            image={image}
            x={0}
            y={0}
            ref={imageRef}
            width={imageSize.width}
            height={imageSize.height}
            draggable={drawMode === MODE.CURSOR}
            onDragMove={handleImageDragMove}
          />
          <Rect
            scale={{ x: scale, y: scale }}
            x={DEFAULT_SIZE_IMAGE.WIDTH}
            y={DEFAULT_SIZE_IMAGE.HEIGHT}
            width={10}
            height={10}
            fill={DEFAULT_COLOR_RESIZE}
            stroke={DEFAULT_STROKE_RESIZE}
            draggable={drawMode === MODE.CURSOR}
            onDragMove={handleCornerDragMove}
            ref={rectRef}
          />
        </Group>
      )}
    </Group>
  );
}
