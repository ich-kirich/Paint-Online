import { CONTEXT, TYPES_FILE } from "@/libs/constants";
import { saveFile, validateFileName } from "@/libs/utils";
import {
  Box,
  Button,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import jsPDF from "jspdf";
import styles from "./SavePicture.module.scss";

export default function SavePicture() {
  const { stageRef } = useContext(CONTEXT);

  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLButtonElement)
  >(null);
  const [isValid, setIsValid] = useState(false);
  const [enterName, setEnterName] = useState<string>("");
  const [selectedType, setSelectedType] = useState(TYPES_FILE.PNG);
  const fileTypes = Object.values(TYPES_FILE);

  const handleChangeType = (event: any) => {
    setSelectedType(event.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateFileName(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setEnterName(e.target.value);
  };

  const handleSave = async () => {
    if (validateFileName(enterName)) {
      if (stageRef) {
        switch (selectedType) {
          case TYPES_FILE.PNG:
          case TYPES_FILE.JPEG:
          case TYPES_FILE.JPG:
          case TYPES_FILE.WEBP:
            saveFile(stageRef, enterName, selectedType);
            break;
          case TYPES_FILE.PDF:
            const uri = stageRef.current!.toDataURL();
            const pdf = new jsPDF();
            pdf.addImage(
              uri,
              "PNG",
              0,
              0,
              Number(stageRef.current!.width),
              Number(stageRef.current!.height),
            );
            pdf.save("stage.pdf");
            break;
          default:
            break;
        }
      }
      handleClose();
    } else {
      setIsValid(false);
    }
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="contained"
        className={styles.save__btn}
      >
        Save
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box className={styles.save__popup}>
          <Typography variant="h6">Enter file name:</Typography>
          <TextField
            label="File name"
            type="text"
            value={enterName}
            onChange={handleNameChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!isValid}
          />
          <Select
            value={selectedType}
            onChange={handleChangeType}
            className={styles.save__type}
          >
            {fileTypes.map((item: string, i: number) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <Button
            onClick={handleSave}
            disabled={!isValid}
            variant="contained"
            color="primary"
            className={styles.save__btn}
          >
            Save
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
