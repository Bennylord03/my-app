import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="grid grid-rows-1 grid-flow-col gap-4 w-full bg-red-300">
        <div className="bg-blue-300 flex">
          <div className="bg-green-300 flex-1 w-33">
            1
          </div>
          <div className="bg-yellow-300 flex-1 w-15">
            2
          </div>
        </div>

        <div className="bg-blue-300">
          09
        </div>
      </div>
      </header>
    </div>
  );
}

export default App;
