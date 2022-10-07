import { useState } from "react";
import "./App.css";
import { Count, CountView } from "./components";

function App() {
    const [count, setCount] = useState(0);
    return (
        <div className="App">
            <CountView count={count} />
            <Count setCount={setCount} count={count} />
        </div>
    );
}

export default App;
