
import { useEffect, useState } from "react";

const LIGHT_COUNT = 5;
const LIGHT_INTERVAL = 400;
const HOLD_DURATION = 700;
const LIGHTS_OUT_DURATION = 350;
const EXIT_DURATION = 650;

function StartingLights({ onComplete }) {
  const [activeLights, setActiveLights] = useState(0);
  const [phase, setPhase] = useState("lighting");

  useEffect(() => {
    const timers = [];

    // Illuminate the five red lights sequentially.
    for (let i = 1; i <= LIGHT_COUNT; i++) {
      timers.push(
        setTimeout(() => {
          setActiveLights(i);
        }, i * LIGHT_INTERVAL)
      );
    }

    // Hold all five lights, then switch them off together.
    const allLightsOnTime = LIGHT_COUNT * LIGHT_INTERVAL;

    timers.push(
      setTimeout(() => {
        setPhase("lights-out");
        setActiveLights(0);
      }, allLightsOnTime + HOLD_DURATION)
    );

    // Transition the intro off-screen.
    timers.push(
      setTimeout(() => {
        setPhase("exiting");
      }, allLightsOnTime + HOLD_DURATION + LIGHTS_OUT_DURATION)
    );

    // Reveal the homepage after the intro transition.
    timers.push(
      setTimeout(() => {
        onComplete?.();
      }, allLightsOnTime + HOLD_DURATION + LIGHTS_OUT_DURATION + EXIT_DURATION)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [onComplete]);

  return (
    <div
      className={`starting-lights-overlay ${
        phase === "exiting" ? "starting-lights-exit" : ""
      }`}
      aria-label="Formula 1 race start animation"
      role="status"
    >
      <div className="starting-lights-content">
        <p className="starting-lights-eyebrow">
          PORTFOLIO
        </p>

        <h1 className="starting-lights-title">
          LIGHTS OUT
          <span> AND AWAY WE GO</span>
        </h1>

        <div className="starting-lights-gantry">
          {Array.from({ length: LIGHT_COUNT }, (_, index) => (
            <div className="starting-light-column" key={index}>
              <span
                className={`starting-light ${
                  index < activeLights ? "is-active" : ""
                }`}
              />
            </div>
          ))}
        </div>

        <p className="starting-lights-status" aria-live="polite">
          {phase === "lighting" && "WAIT FOR THE LIGHTS"}
          {phase === "lights-out" && "LIGHTS OUT!"}
          {phase === "exiting" && "RACE STARTED"}
        </p>

        <div className="starting-lights-progress">
          <span
            style={{
              transform: `scaleX(${activeLights / LIGHT_COUNT})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StartingLights;