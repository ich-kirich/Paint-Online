import { CONTEXT } from "@/libs/constants";
import { validateUrl } from "@/libs/utils";
import { Box, Button, Popover, Typography, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styles from "./ImportFile.module.scss";

export default function ImportFile() {
  const { setImageUrl } = useContext(CONTEXT);

  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLButtonElement)
  >(null);
  const [file, setFile] = useState("");
  const [enterUrl, setEnterUrl] = useState<string>("");
  const [isValid, setIsValid] = useState(false);
  const [isValidImport, setIsValidImport] = useState(false);
  const [disableUrl, setDisabelUrl] = useState(false);
  const [disableFile, setDisableFile] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target!.result;
          setFile(imageUrl as string);
          setIsValidImport(true);
        };
        reader.readAsDataURL(file);
        setDisabelUrl(true);
      }
    } else {
      setFile("");
      setIsValidImport(false);
      setDisabelUrl(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (validateUrl(url)) {
      setFile(url);
      setIsValid(true);
      setDisableFile(true);
      setIsValidImport(true);
    } else {
      setFile("");
      setIsValid(false);
      setIsValidImport(false);
    }
    setEnterUrl(url);
    if (e.target.value === "") {
      setDisableFile(false);
    }
  };

  const handleImport = () => {
    if (isValidImport && file) {
      setImageUrl(file);
      setIsValid(false);
      setIsValidImport(false);
      setDisabelUrl(false);
      setDisableFile(false);
      setEnterUrl("");
      setFile("");
      handleClose();
    }
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="contained"
        className={styles.import__btn}
      >
        Import Picture
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
        <Box className={styles.import__popup}>
          <Typography variant="h6">Enter file:</Typography>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={disableFile}
          />
          <Typography variant="h6">Or Enter URL:</Typography>
          <TextField
            label="Image url"
            type="text"
            value={enterUrl}
            onChange={handleUrlChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!isValid}
            disabled={disableUrl}
          />
          <Button
            onClick={handleImport}
            disabled={!isValidImport}
            variant="contained"
            color="primary"
            className={styles.import__btn}
          >
            Import
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
