import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  //states

  const [color, setColor] = useState([]);

  //functions
  // Fetch the data from the URL
  const fetchData = () => {
    fetch("https://api.prolook.com/api/colors/prolook")
      .then((response) => {
        // Check if the response status is successful (200-299 range)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the response body as JSON
        return response.json();
      })
      .then((data) => {
        // Use the data as needed
        console.log("Fetched data:", data.colors);
        setColor(data.colors);
        // If the data contains a specific date field, you can access it like:
        // const date = data.date;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    fetchData();
    console.log(color);
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className="grid grid-rows-1 grid-flow-col gap-4 w-full p-6">
          <div className="bg-white flex p-3 h-16 border border-gray-600">
            <div className="flex-1 w-32">
              <p className="text-left text-gray-800">Black</p>
            </div>
            <div className="flex-1 w-15">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 border border-blue-700 rounded float-right">
                Preview
              </button>
            </div>
          </div>

          <div>
            <div className="w-1/2 h-48 bg-black align-middle pt-10">
              <div className="justify-center">
                <div className="inline-flex ">
                  <p>Name:</p>
                  <p>Black</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="inline-flex ">
                  <p>hex:</p>
                  <p>0e0e0e</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="inline-flex">
                  <p>color code:</p>
                  <p>B</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
