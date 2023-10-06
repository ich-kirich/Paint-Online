import { CONTEXT } from "@/libs/constants";
import { useContext } from "react";
import styles from "./Palette.module.scss";

export default function Palette() {
  const { color, setColor } = useContext(CONTEXT);
  const handleColorChange = (event: any) => {
    setColor(event.target.value);
  };

  return (
    <div className={styles.palette__wrapper}>
      <label htmlFor="colorPicker">Select color:</label>
      <input
        type="color"
        id="colorPicker"
        value={color}
        onChange={handleColorChange}
      />
    </div>
  );
}
