import "./App.css";
import "./styles/Components.css";
import "./styles/GlobalCSS.css";
import { useState } from "react";
import NestedCheckbox from "./components/NestedCheckbox";
import { data } from "./dummy/Data";

function App() {
  const [value, setValue] = useState({});
  // console.log(value);
  return (
    <div className="App">
      <NestedCheckbox value={data} onChange={(val) => setValue(val)} />
    </div>
  );
}

export default App;
