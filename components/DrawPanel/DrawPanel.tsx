import DrawMode from "../DrawMode/DrawMode";
import Palette from "../Palette/Palette";
import styles from "./DrawPanel.module.scss";

export default function DrawPanel() {
  return (
    <div className={styles.panel__wrapper}>
      <Palette />
      <DrawMode />
    </div>
  );
}
