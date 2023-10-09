import {
  CONTEXT,
  DEFAULT_COLOR,
  DEFAULT_SIZE_HOLST,
  DEFAULT_THICKNESS,
  MODE,
} from "@/libs/constants";
import { useState, useMemo } from "react";
import DrawPanel from "../DrawPanel/DrawPanel";
import Holst from "../Holst/Holst";
import styles from "./MainPage.module.scss";

export default function MainPage() {
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);
  const [selectedHeight, setSelectedHeight] = useState(
    DEFAULT_SIZE_HOLST.HEIGHT,
  );
  const [selectedWidth, setSelectedWidth] = useState(DEFAULT_SIZE_HOLST.WIDTH);
  const [selectedScale, setSelectedScale] = useState(1);
  const [selectedDrawMode, setSelectedDrawMode] = useState(MODE.PENCIL);

  const onChangeScale = (delta: number) => {
    setSelectedScale(selectedScale + delta);
  };

  const [selectedThickness, setSelectedThickness] = useState(DEFAULT_THICKNESS);

  const contextValue = useMemo(
    () => ({
      color: selectedColor,
      setColor: setSelectedColor,
      drawMode: selectedDrawMode,
      setDrawMode: setSelectedDrawMode,
      scale: selectedScale,
      setScale: onChangeScale,
      width: selectedWidth,
      setWidth: setSelectedWidth,
      height: selectedHeight,
      setHeight: setSelectedHeight,
      thickness: selectedThickness,
      setThickness: setSelectedThickness,
    }),
    [
      selectedColor,
      setSelectedColor,
      selectedDrawMode,
      setSelectedDrawMode,
      selectedScale,
      setSelectedScale,
      selectedWidth,
      setSelectedWidth,
      selectedHeight,
      setSelectedHeight,
      selectedThickness,
      setSelectedThickness,
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
