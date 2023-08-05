import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://api.prolook.com/api/colors/prolook")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setColors(data.colors);
        if (data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
          setActiveButton(data.colors[0]);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const previewColor = (colorData) => {
    setSelectedColor(colorData);
  };

  const handleButtonClick = (colorData) => {
    setActiveButton(colorData);
    previewColor(colorData);
  };

  const getLuminance = (hexColor) => {
    const rgbColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    const r = parseInt(rgbColor[1], 16);
    const g = parseInt(rgbColor[2], 16);
    const b = parseInt(rgbColor[3], 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance;
  };

  const getTextColorClass = (bgColor) => {
    const luminance = getLuminance(bgColor);
    return luminance > 0.5 ? "text-black" : "text-white";
  };

  return (
    <div className="App">
      <header className="flex App-header p-0">
        <div className="bg-white w-full">
          <div className="flex w-full pl-6 pt-6">
            <h1 className="text-gray-700 font-bold">Colors:</h1>
          </div>
          <div className="grid grid-rows-56 grid-flow-col w-full p-6 pt-0">
            <div
              className="overflow-auto rounded-lg border border-gray-300"
              style={{ width: 600, height: 574 }}
            >
              {colors.map((colorData, index) => (
                <div
                  key={index}
                  className={`bg-white flex p-3 h-14 border border-gray-300 w-full ${
                    activeButton === colorData ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <p className="text-base text-left text-gray-800">
                      {colorData.name}
                    </p>
                  </div>
                  <div className="flex-1">
                    <button
                      onClick={() => handleButtonClick(colorData)}
                      className={`hover:bg-blue-700 ${
                        activeButton === colorData
                          ? "bg-blue-900 text-white"
                          : "bg-blue-500 text-white"
                      } font-bold text-sm py-2 px-4 border border-blue-700 rounded-lg float-right`}
                    >
                      {activeButton === colorData ? "Preview" : "Preview"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              {selectedColor && (
                <div
                  id="colorPreview"
                  className={`h-96 border border-gray-300 ${getTextColorClass(
                    "#" + selectedColor.hex_code
                  )}`}
                  style={{
                    width: 600,
                    backgroundColor: "#" + selectedColor.hex_code,
                  }}
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col">
                      <div className="inline-flex justify-center">
                        <p>Name:</p>
                        <p>{selectedColor.name}</p>
                      </div>
                      <div className="inline-flex justify-center">
                        <p>hex:</p>
                        <p>{selectedColor.hex_code}</p>
                      </div>
                      <div className="inline-flex justify-center">
                        <p>color code:</p>
                        <p>{selectedColor.color_code}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
