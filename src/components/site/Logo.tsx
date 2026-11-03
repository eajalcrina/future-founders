import Image from "next/image";

const AR = 762.4 / 314;

export default function Logo({ h = 38, kind = "light", className = "" }: { h?: number; kind?: "light" | "white" | "mag"; className?: string }) {
  const src = { light: "/logo/logo-l4.svg", white: "/logo/logo-l4-blanco.svg", mag: "/logo/logo-l4-sobre-magenta.svg" }[kind];
  return <Image src={src} alt="Future Founders" width={Math.round(h * AR)} height={h} className={className} style={{ display: "block", width: Math.round(h * AR), height: h }} unoptimized />;
}
