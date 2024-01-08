import { useEffect } from "react";
import "./style/App.css";
import Home from "./pages/Home/Home";
import Lenis from "@studio-freight/lenis";
import Menu from "./components/Menu/Menu";

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", () => {});

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {};
  }, []);

  return (
    <div className="app">
      {/*  <Menu color="#000" />  */}
      <Home />
    </div>
  );
}

export default App;
