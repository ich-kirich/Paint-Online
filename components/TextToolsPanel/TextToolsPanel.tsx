import { CONTEXT, MODE_PANEL, MODE, FONT_FAMILY } from "@/libs/constants";
import {
  SelectChangeEvent,
  Box,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import classnames from "classnames";
import { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import RttIcon from "@mui/icons-material/Rtt";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import Thickness from "../Thickness/Thickness";
import styles from "./TextToolsPanel.module.scss";
import Palette from "../Palette/Palette";

export default function TextToolsPanel() {
  const {
    text,
    setText,
    setModePanel,
    setDrawMode,
    setFontFamily,
    fontFamily,
    isCrossText,
    setIsCrossText,
    isItalics,
    setIsItalics,
    isBold,
    setIsBold,
  } = useContext(CONTEXT);

  const fontFamilies = Object.values(FONT_FAMILY);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const goBack = () => {
    setModePanel(MODE_PANEL.MAIN);
    setDrawMode(MODE.PENCIL);
  };

  const handleChange = (e: SelectChangeEvent<string>) => {
    setFontFamily(e.target.value);
  };

  const onCrossMode = () => {
    setIsCrossText(!isCrossText);
  };

  const onItalicMode = () => {
    setIsItalics(!isItalics);
  };

  const onBoldMode = () => {
    setIsBold(!isBold);
  };

  return (
    <Box className={styles.panel__wrapper}>
      <ArrowBackIcon className={styles.panel__back} onClick={goBack} />
      <TextField
        label="Enter text"
        variant="outlined"
        fullWidth
        onChange={handleInputChange}
        value={text}
      />
      <Palette />
      <Thickness minValue={8} maxValue={72} />
      <Select
        label="Select font family"
        value={fontFamily}
        onChange={handleChange}
      >
        {fontFamilies.map((font, index) => (
          <MenuItem key={index} value={font}>
            {font}
          </MenuItem>
        ))}
      </Select>
      <Box className={styles.mode__wrapper}>
        <TextDecreaseIcon
          width="16"
          height="16"
          className={classnames(
            styles.mode__tile,
            { [styles.mode__choose]: isCrossText },
            {},
          )}
          onClick={() => onCrossMode()}
        />
        <RttIcon
          width="16"
          height="16"
          className={classnames(
            styles.mode__tile,
            { [styles.mode__choose]: isItalics },
            {},
          )}
          onClick={() => onItalicMode()}
        />
        <FontDownloadIcon
          width="16"
          height="16"
          className={classnames(
            styles.mode__tile,
            { [styles.mode__choose]: isBold },
            {},
          )}
          onClick={() => onBoldMode()}
        />
      </Box>
    </Box>
  );
}
