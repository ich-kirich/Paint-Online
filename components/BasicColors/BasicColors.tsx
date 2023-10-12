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

  return (
    <Box className={styles.basic__wrapper}>
      <Box
        className={styles.basic__tile}
        style={{ backgroundColor: DEFAULT_COLORS.RED }}
        onClick={handleClick}
      />
      <Box
        className={styles.basic__tile}
        style={{ backgroundColor: DEFAULT_COLORS.BLUE }}
        onClick={handleClick}
      />
      <Box
        className={styles.basic__tile}
        style={{ backgroundColor: DEFAULT_COLORS.GREEN }}
        onClick={handleClick}
      />
      <Box
        className={styles.basic__tile}
        style={{ backgroundColor: DEFAULT_COLORS.BLACK }}
        onClick={handleClick}
      />
      <Box
        className={styles.basic__tile}
        style={{ backgroundColor: DEFAULT_COLORS.YELLOW }}
        onClick={handleClick}
      />
      <Box
        className={styles.basic__tile}
        style={{ backgroundColor: DEFAULT_COLORS.WHITE }}
        onClick={handleClick}
      />
    </Box>
  );
}
