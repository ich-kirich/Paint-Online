import { CONTEXT, MODE, MODE_PANEL } from "@/libs/constants";
import { useContext } from "react";
import classnames from "classnames";
import CreateIcon from "@mui/icons-material/Create";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { Box } from "@mui/material";
import FormatColorResetIcon from "@mui/icons-material/FormatColorReset";
import ColorizeIcon from "@mui/icons-material/Colorize";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import styles from "./DrawMode.module.scss";

export default function DrawMode() {
  const { drawMode, setDrawMode, setModePanel } = useContext(CONTEXT);

  const onChangeMode = (mode: string) => () => {
    setDrawMode(mode);
    if (mode === MODE.TEXT) {
      setModePanel(MODE_PANEL.TEXT);
    }
  };

  return (
    <Box className={styles.mode__wrapper}>
      <CreateIcon
        width="16"
        height="16"
        onClick={onChangeMode(MODE.PENCIL)}
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.PENCIL },
          {},
        )}
      />
      <HorizontalRuleIcon
        width="16"
        height="16"
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.LINE },
          {},
        )}
        onClick={onChangeMode(MODE.LINE)}
      />
      <FormatColorResetIcon
        width="16"
        height="16"
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.ERASER },
          {},
        )}
        onClick={onChangeMode(MODE.ERASER)}
      />
      <ColorizeIcon
        width="16"
        height="16"
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.PIPETTE },
          {},
        )}
        onClick={onChangeMode(MODE.PIPETTE)}
      />
      <TextIncreaseIcon
        width="16"
        height="16"
        className={classnames(
          styles.mode__tile,
          { [styles.mode__choose]: drawMode === MODE.TEXT },
          {},
        )}
        onClick={onChangeMode(MODE.TEXT)}
      />
    </Box>
  );
}
