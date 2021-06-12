import Home from '../../pages/Home';
import './App.css';
import { Suspense } from 'react';
import MobileHeader from "../Headers/MobileHeader";

function App() {
  return (
    <div className="App">
        <MobileHeader/>
      <Home></Home>
    </div>
  );
}

// here app catches the suspense from page in case translations are not yet loaded
export default function WrappedApp() {
    return (
        <Suspense fallback="...is loading">
            <App />
        </Suspense>
    );
}
