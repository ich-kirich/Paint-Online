import { CONTEXT, DEFAULE_COLOR, MODE } from "@/libs/constants";
import { useState, useMemo } from "react";
import DrawPanel from "../DrawPanel/DrawPanel";
import Holst from "../Holst/Holst";
import styles from "./MainPage.module.scss";

export default function MainPage() {
  const [selectedColor, setSelectedColor] = useState(DEFAULE_COLOR);
  const [selectedDrawMode, setSelectedDrawMode] = useState(MODE.PENCIL);
  const contextValue = useMemo(
    () => ({
      color: selectedColor,
      setColor: setSelectedColor,
      drawMode: selectedDrawMode,
      setDrawMode: setSelectedDrawMode,
    }),
    [selectedColor, setSelectedColor, selectedDrawMode, setSelectedDrawMode],
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
