import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

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
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const previewColor = (colorData) => {
    setSelectedColor(colorData);
    console.log(colorData);
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
      <header className="App-header">
        <div className="grid grid-rows-56 grid-flow-col gap-4 w-full p-6">
          <div className="overflow-scroll h-screen">
            {colors.map((colorData, index) => (
              <div
                key={index}
                className="bg-white flex p-3 h-16 border border-gray-600"
              >
                <div className="flex-1 w-32">
                  <p className="text-left text-gray-800">{colorData.name}</p>
                </div>
                <div className="flex-1 w-15">
                  <button
                    onClick={() => previewColor(colorData)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 border border-blue-700 rounded float-right"
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            {selectedColor && (
              <div
                id="colorPreview"
                className={`w-1/2 h-48 align-middle pt-10 ${getTextColorClass(
                  "#" + selectedColor.hex_code
                )}`}
                style={{ backgroundColor: "#" + selectedColor.hex_code }}
              >
                <div className="justify-center">
                  <div className="inline-flex">
                    <p>Name:</p>
                    <p>{selectedColor.name}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="inline-flex">
                    <p>hex:</p>
                    <p>{selectedColor.hex_code}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="inline-flex">
                    <p>color code:</p>
                    <p>{selectedColor.color_code}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
