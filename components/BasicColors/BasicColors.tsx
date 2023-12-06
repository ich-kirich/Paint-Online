import { CONTEXT, DEFAULT_COLORS, MODE } from "@/libs/constants";
import { Box } from "@mui/material";
import { useContext } from "react";
import rgbHex from "rgb-hex";
import styles from "./BasicColors.module.scss";

export default function BasicColors() {
  const { setColor, setDrawMode, drawMode } = useContext(CONTEXT);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedElement = e.currentTarget;
    const computedStyle = window.getComputedStyle(clickedElement);
    const backgroundColor = computedStyle.backgroundColor;
    setColor(`#${rgbHex(backgroundColor)}`);
    if (drawMode === MODE.ERASER) {
      setDrawMode(MODE.PENCIL);
    }
  };

  const defaultColors = Object.values(DEFAULT_COLORS);

  return (
    <Box className={styles.basic__wrapper}>
      {defaultColors.map((color, index) => (
        <Box
          key={index}
          className={styles.basic__tile}
          style={{ backgroundColor: color }}
          onClick={handleClick}
        />
      ))}
    </Box>
  );
}
