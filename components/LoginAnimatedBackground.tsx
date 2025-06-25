"use client";

import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadLinksPreset } from "tsparticles-preset-links";
import { motion, useAnimationFrame } from "framer-motion";

export default function LoginAnimatedBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadLinksPreset(engine);
    }, []);

    const [offset, setOffset] = useState(0);
    useAnimationFrame(() => {
        setOffset((prev) => (prev + 0.15) % 360);
    });

    return (
        <>
            <Particles
                id="tsparticles-login"
                init={particlesInit}
                options={{
                    preset: "links",
                    fullScreen: { enable: true, zIndex: 0 },  // Burada 0
                    background: { color: { value: "#0f172a" } },
                    particles: {
                        color: { value: "#60a5fa" },
                        links: {
                            color: "#3b82f6",
                            distance: 100,
                            enable: true,
                            opacity: 0.2,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 1.2,
                            direction: "none",
                            random: false,
                            straight: false,
                            outModes: { default: "bounce" },
                        },
                        number: { value: 40, density: { enable: true, area: 800 } },
                        opacity: { value: 0.4 },
                        shape: { type: "circle" },
                        size: { value: { min: 1, max: 3 } },
                    },
                    interactivity: {
                        events: {
                            onHover: { enable: true, mode: "grab" },
                            onClick: { enable: true, mode: "push" },
                        },
                        modes: {
                            grab: { distance: 130, links: { opacity: 0.5 } },
                            push: { quantity: 3 },
                        },
                    },
                    detectRetina: true,
                }}
            />

            <motion.div
                className="fixed inset-0 -z-10"
                style={{
                    background: `conic-gradient(
            from ${offset}deg,
            #3b82f6,
            #60a5fa,
            #2563eb,
            #3b82f6
          )`,
                    filter: "blur(60px)",
                    opacity: 0.5,
                }}
            />
        </>
    );
}
