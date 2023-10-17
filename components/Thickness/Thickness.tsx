import { CONTEXT } from "@/libs/constants";
import { IThicknessProps } from "@/types/types";
import { Typography, Slider, Box, Button, Popover } from "@mui/material";
import { useContext, useState } from "react";
import styles from "./Thickness.module.scss";

export default function Thickness(props: IThicknessProps) {
  const { minValue, maxValue } = props;
  const { thickness, setThickness } = useContext(CONTEXT);
  const step = 1;

  const handleChange = (e: Event, newValue: number | number[]) => {
    setThickness(newValue);
  };

  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLButtonElement)
  >(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="contained"
        className={styles.thickness__btn}
      >
        Change thickness
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
        <Box className={styles.thickness__popup}>
          <Slider
            value={thickness < minValue || thickness > maxValue ? setThickness(minValue) : thickness}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={minValue}
            max={maxValue}
            step={step}
          />
          <Typography>Сurrent thickness: {thickness}</Typography>
        </Box>
      </Popover>
    </Box>
  );
}
