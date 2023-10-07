import { CONTEXT } from "@/libs/constants";
import { Box } from "@mui/material";
import { useContext } from "react";
import styles from "./Palette.module.scss";

export default function Palette() {
  const { color, setColor } = useContext(CONTEXT);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <Box className={styles.palette__wrapper}>
      <label htmlFor="colorPicker">Select color:</label>
      <input
        type="color"
        id="colorPicker"
        value={color}
        onChange={handleColorChange}
      />
    </Box>
  );
}
