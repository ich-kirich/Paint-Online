import {
  CONTEXT,
  DEFAULT_COLOR,
  DEFAULT_SCALE,
  DEFAULT_SIZE_HOLST,
  DEFAULT_TEXT,
  DEFAULT_THICKNESS,
  FONT_FAMILY,
  MODE,
  MODE_PANEL,
} from "@/libs/constants";
import Konva from "konva";
import { useState, useMemo, useRef } from "react";
import DrawPanel from "../DrawPanel/DrawPanel";
import Holst from "../Holst/Holst";
import styles from "./MainPage.module.scss";

export default function MainPage() {
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);
  const [selectedHeight, setSelectedHeight] = useState(
    DEFAULT_SIZE_HOLST.HEIGHT,
  );
  const [selectedWidth, setSelectedWidth] = useState(DEFAULT_SIZE_HOLST.WIDTH);
  const [selectedScale, setSelectedScale] = useState(DEFAULT_SCALE);
  const [selectedDrawMode, setSelectedDrawMode] = useState(MODE.PENCIL);
  const [selectedModePanel, setSelectedModePanel] = useState(MODE_PANEL.MAIN);
  const [selectedThickness, setSelectedThickness] = useState(DEFAULT_THICKNESS);
  const [inputText, setInputText] = useState(DEFAULT_TEXT);
  const [selectedFontFamily, setSelectedFontFamily] = useState(
    FONT_FAMILY.ARIAL,
  );
  const [isCrossText, setIsCrossText] = useState(false);
  const [isItalics, setIsItalics] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const stageRef = useRef<Konva.Stage | null>(null);

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
      width: selectedWidth,
      setWidth: setSelectedWidth,
      height: selectedHeight,
      setHeight: setSelectedHeight,
      thickness: selectedThickness,
      setThickness: setSelectedThickness,
      modePanel: selectedModePanel,
      setModePanel: setSelectedModePanel,
      text: inputText,
      setText: setInputText,
      fontFamily: selectedFontFamily,
      setFontFamily: setSelectedFontFamily,
      isCrossText,
      setIsCrossText,
      isItalics,
      setIsItalics,
      isBold,
      setIsBold,
      stageRef,
      imageUrl,
      setImageUrl,
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
      selectedModePanel,
      setSelectedModePanel,
      inputText,
      setInputText,
      selectedFontFamily,
      setSelectedFontFamily,
      isCrossText,
      setIsCrossText,
      isItalics,
      setIsItalics,
      isBold,
      setIsBold,
      stageRef,
      imageUrl,
      setImageUrl,
    ],
  );
  return (
    <CONTEXT.Provider value={contextValue}>
      <main className={styles.main__wrapper}>
        <DrawPanel />
        <Holst />
      </main>
    </CONTEXT.Provider>
  );
}
