import Holst from "../Holst/Holst";
import Palette from "../Palette/Palette";
import styles from "./MainPage.module.scss"

export default function MainPage() {
  return (
    <main className={styles.main__wrapper}>
      <h1>Paint Online</h1>
      <Palette />
      <Holst />
    </main>
  );
}
