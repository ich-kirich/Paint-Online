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
      <input
        type="color"
        id="colorPicker"
        value={color}
        onChange={handleColorChange}
        className={styles.palette}
      />
    </Box>
  );
}
