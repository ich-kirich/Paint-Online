import { Box } from "@mui/material";
import BasicColors from "../BasicColors/BasicColors";
import DrawMode from "../DrawMode/DrawMode";
import Palette from "../Palette/Palette";
import SizeHolst from "../SizeHolst/SizeHolst";
import ThicknessLine from "../ThicknessLine/ThicknessLine";
import ZoomPanel from "../ZoomPanel/ZoomPanel";
import styles from "./DrawPanel.module.scss";

export default function DrawPanel() {
  return (
    <Box className={styles.panel__wrapper}>
      <BasicColors />
      <Palette />
      <DrawMode />
      <ZoomPanel />
      <SizeHolst />
      <ThicknessLine />
    </Box>
  );
}
