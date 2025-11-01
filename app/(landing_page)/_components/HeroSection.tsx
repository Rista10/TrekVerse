"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/explore`);
  }

  useEffect(() => {
    if (!textRef.current) return;

    // Ensure GSAP initial values match server-rendered HTML to avoid hydration
    // mismatches. The element has inline styles set below so the server HTML
    // and client initial DOM match before GSAP runs.
    gsap.set(textRef.current, { opacity: -1, y: 50 });

    gsap.to(textRef.current, {
      opacity: 1,
      y: -150,
      scrollTrigger: {
        trigger: document.body,
        start: "top 80%",
        end: "50% top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="fixed top-0 left-0 w-full h-[calc(100vh-4rem)] flex items-center justify-center pointer-events-none z-10">
      <div
        ref={textRef}
        // Match GSAP's initial animation state on the server to avoid
        // hydration mismatch: opacity 0, translated down 50px.
        className="text-center px-4"
        style={{ opacity: 0, transform: 'translateY(50px)' }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
          Welcome to TrekVerse
        </h1>

        <p className="text-lg md:text-xl text-gray-900 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
          Experience the majestic Himalayas with guided treks across Nepal's most breathtaking trails —
          delivering unforgettable adventures, expert guidance, and authentic cultural experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
          <Button variant="primary" onClick={() => handleButtonClick()}>Explore Treks →</Button>
          {/* <Button variant="secondary">View Gallery →</Button> */}
        </div>
      </div>
      <Image
        src="/flag1.png"
        alt="Nepal"
        height={300}
        width={150}
        className="fixed bottom-0 -right-2.5 z-20"
        priority
      />
    </section>
  );
}