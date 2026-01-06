"use client";

import { motion, useInView, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    y?: number;
    className?: string;
    once?: boolean; // Animate only once when entering viewport
    amount?: number; // How much of the element should be visible before triggering
}

const revealVariants: Variants = {
    hidden: (y: number) => ({
        opacity: 0,
        y: y,
    }),
    visible: {
        opacity: 1,
        y: 0,
    },
};

export function Reveal({
    children,
    delay = 0,
    duration = 0.4,
    y = 20,
    className = "",
    once = true,
    amount = 0.3,
}: RevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    return (
        <motion.div
            ref={ref}
            custom={y}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={revealVariants}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
