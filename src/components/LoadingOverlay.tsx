interface LoadingOverlayProps {
  text?: string;
}

export default function LoadingOverlay({ text }: LoadingOverlayProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <div>{text || "Loading..."}</div>
    </div>
  );
}
