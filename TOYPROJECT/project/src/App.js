import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Main, Join, Login } from "./pages";
import { Header, Footer } from "./components";
import { useState } from "react";

function App() {
    const [isLogined, setIsLogined] = useState(false);
    return (
        <div className="App">
            <Header isLogined={isLogined} setIsLogined={setIsLogined} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/join" element={<Join />} />
                <Route
                    path="/login"
                    element={<Login setIsLogined={setIsLogined} />}
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
