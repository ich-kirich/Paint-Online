import { CONTEXT, FONT_FAMILY, MODE, MODE_PANEL } from "@/libs/constants";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import RttIcon from "@mui/icons-material/Rtt";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import BasicColors from "../BasicColors/BasicColors";
import DrawMode from "../DrawMode/DrawMode";
import Palette from "../Palette/Palette";
import SizeHolst from "../SizeHolst/SizeHolst";
import Thickness from "../Thickness/Thickness";
import UserColors from "../UserColors/UserColors";
import ZoomPanel from "../ZoomPanel/ZoomPanel";
import styles from "./DrawPanel.module.scss";
import classnames from "classnames";

export default function DrawPanel() {
  const {
    modePanel,
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
    <Box>
      {modePanel === MODE_PANEL.MAIN && (
        <Box className={styles.panel__wrapper}>
          <UserColors />
          <BasicColors />
          <Palette />
          <DrawMode />
          <ZoomPanel />
          <SizeHolst />
          <Thickness minValue={1} maxValue={100} />
        </Box>
      )}
      {modePanel === MODE_PANEL.TEXT && (
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
            <MenuItem value={FONT_FAMILY.ARIAL}>{FONT_FAMILY.ARIAL}</MenuItem>
            <MenuItem value={FONT_FAMILY.CALIBRI}>
              {FONT_FAMILY.CALIBRI}
            </MenuItem>
            <MenuItem value={FONT_FAMILY.GEORGIA}>
              {FONT_FAMILY.GEORGIA}
            </MenuItem>
            <MenuItem value={FONT_FAMILY.IMPACT}>{FONT_FAMILY.IMPACT}</MenuItem>
            <MenuItem value={FONT_FAMILY.PALATINO}>
              {FONT_FAMILY.PALATINO}
            </MenuItem>
            <MenuItem value={FONT_FAMILY.TAHOMA}>{FONT_FAMILY.TAHOMA}</MenuItem>
            <MenuItem value={FONT_FAMILY.TIMES_NEW_ROMAN}>
              {FONT_FAMILY.TIMES_NEW_ROMAN}
            </MenuItem>
            <MenuItem value={FONT_FAMILY.VERDANA}>
              {FONT_FAMILY.VERDANA}
            </MenuItem>
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
      )}
    </Box>
  );
}
