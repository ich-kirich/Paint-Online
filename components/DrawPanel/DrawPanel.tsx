import { CONTEXT, MODE_PANEL } from "@/libs/constants";
import { Box } from "@mui/material";
import { useContext } from "react";
import MainToolsPanel from "../MainToolsPanel/MainToolsPanel";
import TextToolsPanel from "../TextToolsPanel/TextToolsPanel";

export default function DrawPanel() {
  const { modePanel } = useContext(CONTEXT);

  return (
    <Box>
      {modePanel === MODE_PANEL.MAIN && <MainToolsPanel />}
      {modePanel === MODE_PANEL.TEXT && <TextToolsPanel />}
    </Box>
  );
}
