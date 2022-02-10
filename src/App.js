import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const totalTime = 10000;
  const [counter, setCounter] = useState(3);
  const [circleText, setCircleText] = useState(`Breathe out... ${counter}`);
  const [containerClassName, setContainerClassName] = useState("container");
  const [animationStart, setAnimationStart] = useState(0);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
        setCircleText(`Breathe out... ${counter}`);
      }, 1000);
    return () => {
      setAnimationStart(1);
      clearInterval(timer);
    };
  }, [counter]);

  function breatheAnimation() {
    const breatheTime = (totalTime / 5) * 2;
    const holdTime = totalTime / 5;

    setCircleText("Breathe in");
    setContainerClassName("container grow");

    setTimeout(() => {
      setCircleText("Hold");

      setTimeout(() => {
        setCircleText("Breathe out");
        setContainerClassName("container shrink");
      }, holdTime);
    }, breatheTime);
  }

  return (
    <div className="App">
      <div className={containerClassName}>
        <div className="circle"></div>

        <p id="text">{circleText}</p>

        <div
          className="pointer-container"
          animation={animationStart}
          onAnimationStart={breatheAnimation}
          onAnimationIteration={breatheAnimation}
        >
          <div className="pointer"></div>
        </div>

        <div className="gradient-circle"></div>
      </div>
    </div>
  );
}

export default App;
