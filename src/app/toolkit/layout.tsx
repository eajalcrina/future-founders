export default function ToolkitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflowY: "auto",
        overflowX: "hidden",
        background: "#F5F6FF",
        color: "#0B0B1E",
        zIndex: 50,
      }}
    >
      {children}
    </div>
  );
}
