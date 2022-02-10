import "./App.css";
import { useState, useEffect } from "react";

function NewApp() {
  const [totalTime, setTotalTime] = useState(10000);
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
      <h1>Breathe</h1>

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
      <div className="input">
        <label htmlFor="breath-length">Breath length</label>
        <input
          type="number"
          id="breath-length"
          name="breath-length"
          onChange={(e) => {
            setTotalTime(e.target.value);
            document.documentElement.style.setProperty(
              "--total-time",
              e.target.value + "s"
            );
            document.documentElement.style.setProperty(
              "--breath-time",
              (e.target.value / 5) * 2 + "s"
            );
          }}
        />
        <p>seconds</p>
      </div>
    </div>
  );
}
