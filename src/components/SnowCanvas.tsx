import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  opacity: number;
}

function rnd(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function makeFlakes(w: number, h: number): Flake[] {
  const count = Math.round((w * h) / 18000);
  return Array.from({ length: Math.max(20, count) }, () => ({
    x: rnd(0, w),
    y: rnd(0, h),
    r: rnd(0.8, 2.2),
    speed: rnd(0.15, 0.5),
    drift: rnd(-0.15, 0.15),
    opacity: rnd(0.15, 0.4),
  }));
}

export default function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flakesRef = useRef<Flake[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const cvs = canvasRef.current;
    if (!cvs) return;
    const context = cvs.getContext("2d");
    if (!context) return;

    const canvas = cvs;
    const ctx = context;

    let w = 0;
    let h = 0;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flakesRef.current = makeFlakes(w, h);
    }

    function loop() {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakesRef.current) {
        f.y += f.speed;
        f.x += f.drift;
        if (f.y > h + 4) {
          f.y = -4;
          f.x = rnd(0, w);
        }
        if (f.x < -4) f.x = w + 4;
        if (f.x > w + 4) f.x = -4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(120,116,108,${f.opacity})`;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="snow-canvas" />;
}
