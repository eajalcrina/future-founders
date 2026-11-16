"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Imagen en duotono con parallax mínimo (±5 %) dentro de su marco. Quieta con prefers-reduced-motion.
 * `quieto`: sin parallax y sin el margen extra (retratos, para que el pelo no toque el filete del marco). */
export default function Parallax({
  src,
  alt,
  sizes,
  preload = false,
  className = "",
  position = "center",
  quieto = false,
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  position?: string;
  quieto?: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className={quieto ? "absolute inset-0" : "absolute inset-[-6%_0]"} style={reduce || quieto ? undefined : { y }}>
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" style={{ objectPosition: position }} />
        {children}
      </motion.div>
    </div>
  );
}
