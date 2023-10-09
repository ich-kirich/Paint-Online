import DrawMode from "../DrawMode/DrawMode";
import Palette from "../Palette/Palette";
import SizeHolst from "../SizeHolst/SizeHolst";
import ThicknessLine from "../ThicknessLine/ThicknessLine";
import ZoomPanel from "../ZoomPanel/ZoomPanel";
import styles from "./DrawPanel.module.scss";

export default function DrawPanel() {
  return (
    <div className={styles.panel__wrapper}>
      <Palette />
      <DrawMode />
      <ZoomPanel />
      <SizeHolst />
      <ThicknessLine />
    </div>
  );
}
