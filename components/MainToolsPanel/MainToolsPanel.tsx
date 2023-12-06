import { Box } from "@mui/material";
import BasicColors from "../BasicColors/BasicColors";
import DrawMode from "../DrawMode/DrawMode";
import Palette from "../Palette/Palette";
import SizeHolst from "../SizeHolst/SizeHolst";
import Thickness from "../Thickness/Thickness";
import UserColors from "../UserColors/UserColors";
import ZoomPanel from "../ZoomPanel/ZoomPanel";
import styles from "./MainToolsPanel.module.scss";

export default function MainToolsPanel() {
  return (
    <Box className={styles.panel__wrapper}>
      <UserColors />
      <BasicColors />
      <Palette />
      <DrawMode />
      <ZoomPanel />
      <SizeHolst />
      <Thickness minValue={1} maxValue={100} />
    </Box>
  );
}
