"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Imagen en duotono con parallax mínimo (±5 %) dentro de su marco. Quieta con prefers-reduced-motion. */
export default function Parallax({
  src,
  alt,
  sizes,
  preload = false,
  className = "",
  position = "center",
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  position?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-6%_0]" style={reduce ? undefined : { y }}>
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" style={{ objectPosition: position }} />
        {children}
      </motion.div>
    </div>
  );
}
