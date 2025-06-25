"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadLinksPreset } from "tsparticles-preset-links";

export default function AnimatedBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadLinksPreset(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            style={{ position: "absolute", inset: 0 }} // pozisyonu elle kontrol ediyoruz
            options={{
                preset: "links",
                fullScreen: false, // Burayı false yapıyoruz, tam ekran kaplamıyor artık
                background: {
                    color: {
                        value: "#0f172a"
                    },
                },
                particles: {
                    color: { value: "#4ade80" },
                    links: {
                        color: "#22c55e",
                        distance: 120,
                        enable: true,
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 2.5,
                        direction: "none",
                        random: false,
                        straight: false,
                        outModes: {
                            default: "bounce",
                        },
                    },
                    number: {
                        value: 60,
                        density: {
                            enable: true,
                            area: 800,
                        },
                    },
                    opacity: {
                        value: 0.6,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.3,
                            sync: false,
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 4 },
                    },
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "grab",
                        },
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            links: {
                                opacity: 0.7,
                            },
                        },
                        push: {
                            quantity: 4,
                        },
                    },
                },
                detectRetina: true,
            }}
        />
    );
}
