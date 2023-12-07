import { USER_DEFAULT_COLOR, MODE, CONTEXT } from "@/libs/constants";
import { Box, Button, Popover, Typography } from "@mui/material";
import { useContext, useState } from "react";
import rgbHex from "rgb-hex";
import styles from "./UserColors.module.scss";

export default function UserColors() {
  const { setColor, setDrawMode, drawMode } = useContext(CONTEXT);

  const [userColors, setUserColors] = useState(
    Array(4).fill(USER_DEFAULT_COLOR),
  );

  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLButtonElement)
  >(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newColor = e.target.value;
    setUserColors((prevUserColors) => {
      const updatedUserColors = [...prevUserColors];
      updatedUserColors[index] = newColor;
      return updatedUserColors;
    });
  };

  const handleColorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedElement = e.currentTarget;
    const computedStyle = window.getComputedStyle(clickedElement);
    const backgroundColor = computedStyle.backgroundColor;
    setColor(`#${rgbHex(backgroundColor)}`);
    if (drawMode === MODE.ERASER) {
      setDrawMode(MODE.PENCIL);
    }
  };

  return (
    <Box className={styles.colors__wrapper}>
      <Button
        onClick={handleClick}
        variant="contained"
        className={styles.colors__btn}
      >
        Set colors
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box className={styles.colors__popup}>
          {userColors.map((item: string, i: number) => (
            <Box key={i} className={styles.colors__item}>
              <Typography variant="subtitle1" component="h6">
                {i + 1}:
              </Typography>
              <input
                type="color"
                id={`colorPicker-${i}`}
                value={item}
                onChange={(e) => handleColorChange(e, i)}
              />
            </Box>
          ))}
        </Box>
      </Popover>
      <Box className={styles.color__wrapper}>
        {userColors.map((item: string, i: number) => (
          <Box
            key={i}
            className={styles.color__tile}
            style={{ backgroundColor: item }}
            onClick={handleColorClick}
          />
        ))}
      </Box>
    </Box>
  );
}
