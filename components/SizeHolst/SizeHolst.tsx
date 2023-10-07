import { CONTEXT } from "@/libs/constants";
import { Box, Button, Popover, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import styles from "./SizeHolst.module.scss";

export default function SizeHolst() {
  const { width, height, setWidth, setHeight } = useContext(CONTEXT);

  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLButtonElement)
  >(null);
  const [isValid, setIsValid] = useState(true);
  const [enterWidth, setEnterWidth] = useState(width);
  const [enterHeight, setEnterHeight] = useState(height);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    if (enterWidth >= 0 && enterHeight >= 0) {
      setWidth(enterWidth);
      setHeight(enterHeight);
      handleClose();
    } else {
      setIsValid(false);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setEnterWidth(value);
    setIsValid(value >= 0 && enterHeight >= 0);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setEnterHeight(value);
    setIsValid(enterWidth >= 0 && value >= 0);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="contained"
        className={styles.size__btn}
      >
        Change Size
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
        <Box className={styles.size__popup}>
          <Typography variant="h6">
            Enter width and height:
          </Typography>
          <TextField
            label="Width"
            type="number"
            value={enterWidth}
            onChange={handleWidthChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!isValid}
          />
          <TextField
            label="Height"
            type="number"
            value={enterHeight}
            onChange={handleHeightChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!isValid}
          />
          <Button
            onClick={handleSave}
            disabled={!isValid}
            variant="contained"
            color="primary"
            className={styles.size__btn}
          >
            Save
          </Button>
        </Box>
      </Popover>
    </div>
  );
}
