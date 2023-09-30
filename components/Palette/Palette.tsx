import { useState } from "react";

export default function Palette() {
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleColorChange = (event: any) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div>
      <label htmlFor="colorPicker">Выберите цвет:</label>
      <input
        type="color"
        id="colorPicker"
        value={selectedColor}
        onChange={handleColorChange}
      />
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: selectedColor,
          marginTop: "10px",
        }}
      ></div>
      <p>Выбранный цвет: {selectedColor}</p>
    </div>
  );
}
