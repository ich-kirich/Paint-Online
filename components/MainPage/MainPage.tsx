import { CONTEXT, DEFAULE_COLOR, MODE } from "@/libs/constants";
import { useState, useMemo } from "react";
import DrawPanel from "../DrawPanel/DrawPanel";
import Holst from "../Holst/Holst";
import styles from "./MainPage.module.scss";

export default function MainPage() {
  const [selectedColor, setSelectedColor] = useState(DEFAULE_COLOR);
  const [selectedScale, setSelectedScale] = useState(1);
  const [selectedDrawMode, setSelectedDrawMode] = useState(MODE.PENCIL);

  const onChangeScale = (delta: number) => {
    setSelectedScale(selectedScale + delta);
  };

  const contextValue = useMemo(
    () => ({
      color: selectedColor,
      setColor: setSelectedColor,
      drawMode: selectedDrawMode,
      setDrawMode: setSelectedDrawMode,
      scale: selectedScale,
      setScale: onChangeScale,
    }),
    [
      selectedColor,
      setSelectedColor,
      selectedDrawMode,
      setSelectedDrawMode,
      selectedScale,
      setSelectedScale,
    ],
  );
  return (
    <CONTEXT.Provider value={contextValue}>
      <main className={styles.main__wrapper}>
        <h1>Paint Online</h1>
        <DrawPanel />
        <Holst />
      </main>
    </CONTEXT.Provider>
  );
}
