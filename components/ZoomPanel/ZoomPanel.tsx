import { CONTEXT } from "@/libs/constants";
import { Box } from "@mui/material";
import { useCallback, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./ZoomPanel.module.scss";

export default function ZoomPanel() {
  const { scale, setScale } = useContext(CONTEXT);
  const zoomIn = useCallback(() => {
    if (scale < 3) {
      setScale(0.25);
    }
  }, [scale, setScale]);

  const zoomOut = useCallback(() => {
    if (scale > 0.5) {
      setScale(-0.25);
    }
  }, [scale, setScale]);

  return (
    <Box className={styles.zoom__wrapper}>
      <Box className={styles.zoom__btn} onClick={zoomIn}>
        <AddIcon />
      </Box>
      <Box className={styles.zoom__value}>{scale * 100}%</Box>
      <Box className={styles.zoom__btn} onClick={zoomOut}>
        <RemoveIcon />
      </Box>
    </Box>
  );
}
