import { CONTEXT, MODE, MODE_PANEL } from "@/libs/constants";
import { useContext } from "react";
import classnames from "classnames";
import CreateIcon from "@mui/icons-material/Create";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { Box } from "@mui/material";
import FormatColorResetIcon from "@mui/icons-material/FormatColorReset";
import ColorizeIcon from "@mui/icons-material/Colorize";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import styles from "./DrawMode.module.scss";

export default function DrawMode() {
  const { drawMode, setDrawMode, setModePanel } = useContext(CONTEXT);

  const widthIcon = "10";
  const heightIcon = "10";

  const onChangeMode = (mode: string) => () => {
    setDrawMode(mode);
    if (mode === MODE.TEXT) {
      setModePanel(MODE_PANEL.TEXT);
    }
  };

  return (
    <Box className={styles.mode__wrapper}>
      <CreateIcon
        width={widthIcon}
        height={heightIcon}
        onClick={onChangeMode(MODE.PENCIL)}
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.PENCIL },
          {},
        )}
      />
      <HorizontalRuleIcon
        width={widthIcon}
        height={heightIcon}
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.LINE },
          {},
        )}
        onClick={onChangeMode(MODE.LINE)}
      />
      <FormatColorResetIcon
        width={widthIcon}
        height={heightIcon}
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.ERASER },
          {},
        )}
        onClick={onChangeMode(MODE.ERASER)}
      />
      <ColorizeIcon
        width={widthIcon}
        height={heightIcon}
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.PIPETTE },
          {},
        )}
        onClick={onChangeMode(MODE.PIPETTE)}
      />
      <TextIncreaseIcon
        width={widthIcon}
        height={heightIcon}
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.TEXT },
          {},
        )}
        onClick={onChangeMode(MODE.TEXT)}
      />
      <CircleOutlinedIcon
        width={widthIcon}
        height={heightIcon}
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.ELLIPSE },
          {},
        )}
        onClick={onChangeMode(MODE.ELLIPSE)}
      />
      <RectangleOutlinedIcon
        width={widthIcon}
        height={heightIcon}
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.RECT },
          {},
        )}
        onClick={onChangeMode(MODE.RECT)}
      />
      <FormatColorFillIcon
        width={widthIcon}
        height={heightIcon}
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.FILLING },
          {},
        )}
        onClick={onChangeMode(MODE.FILLING)}
      />
      <PanToolAltIcon
        width={widthIcon}
        height={heightIcon}
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.CURSOR },
          {},
        )}
        onClick={onChangeMode(MODE.CURSOR)}
      />
    </Box>
  );
}
