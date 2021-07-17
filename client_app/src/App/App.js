import Home from "../pages/Home";
import "./App.css";
import { Suspense, React } from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

// here app catches the suspense from page in case translations are not yet loaded
export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <Router>
        <App />
      </Router>
    </Suspense>
  );
}
