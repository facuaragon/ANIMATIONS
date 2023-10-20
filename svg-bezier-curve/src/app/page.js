"use client";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const path = useRef(null);
  let progress = 0;
  let time = Math.PI / 2;
  let reqId = null;
  let x = 0.5;
  useEffect(() => {
    setPath(progress);
  }, []);
  const setPath = (progress) => {
    const { innerWidth } = window;
    const width = innerWidth * 1; //length of svg 100vw
    path.current.setAttributeNS(
      "",
      "d",
      `M0 50 Q${width * x} ${50 + progress}, ${width} 50` // 50 because line has 100px height (middle)
    );
  };
  const manageMouseMove = (e) => {
    const { movementY, clientX } = e;
    const { left, width } = path.current.getBoundingClientRect();
    x = (clientX - left) / width;
    progress += movementY;
    setPath(progress);
  };
  const manageMouseLeave = (e) => {
    animateOut();
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    time += 0.2;
    setPath(newProgress);
    progress = lerp(progress, 0, 0.025);
    if (Math.abs(progress) > 0.75) {
      reqId = window.requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };
  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };
  const mangeMouseEnter = () => {
    if (reqId) {
      window.cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div
              onMouseEnter={mangeMouseEnter}
              onMouseMove={manageMouseMove}
              onMouseLeave={manageMouseLeave}
              className={styles.box}
            ></div>
            <svg>
              <path ref={path}></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
