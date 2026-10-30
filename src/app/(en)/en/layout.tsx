import { Root, baseMetadata } from "@/components/Root";

export { viewport } from "@/components/Root";
export const metadata = baseMetadata("en");

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <Root lang="en">{children}</Root>;
}
