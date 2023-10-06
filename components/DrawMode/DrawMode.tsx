import { CONTEXT, MODE } from "@/libs/constants";
import { useContext } from "react";
import classnames from "classnames";
import CreateIcon from "@mui/icons-material/Create";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import styles from "./DrawMode.module.scss";

export default function DrawMode() {
  const { drawMode, setDrawMode } = useContext(CONTEXT);

  const onChangeMode = (mode: string) => () => {
    setDrawMode(mode);
  };

  return (
    <div className="toolbar">
      <CreateIcon
        width="16"
        height="16"
        onClick={onChangeMode(MODE.PENCIL)}
        className={classnames(
          { [styles.mode__choose]: drawMode === MODE.PENCIL },
          {},
        )}
      />
      <HorizontalRuleIcon
        width="16"
        height="16"
        className={classnames(
          { [styles.mode__choose]: drawMode === MODE.LINE },
          {},
        )}
        onClick={onChangeMode(MODE.LINE)}
      />
    </div>
  );
}
