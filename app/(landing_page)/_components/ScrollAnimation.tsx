"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCount = 192;
  const currentFrame = (index: number): string =>
    `/frames/frame_${String(index).padStart(4, "0")}.png`;

  const images: HTMLImageElement[] = [];
  const imageSeq = { frame: 0 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = 1280;
    canvas.height = 720;

    // Preload all frames
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const frameIndex = Math.floor(imageSeq.frame);
      const img = images[frameIndex];
      if (!img) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    gsap.to(imageSeq, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 1,
        start: 0,
        end: "7500", 
      },
      onUpdate: render,
    });

    images[0].onload = render;

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative w-full h-[4000px] bg-transparent">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full object-cover"
      />
    </section>
  );
}
