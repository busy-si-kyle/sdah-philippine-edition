import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #27272a 100%)",
          color: "white",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
        }}
      >
        <div
          style={{
            width: "86%",
            height: "86%",
            borderRadius: 36,
            border: "3px solid rgba(255,255,255,0.18)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            background: "rgba(255,255,255,0.06)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: "-0.06em" }}>
            SDA
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "0.18em" }}>
            HYMNAL
          </div>
        </div>
      </div>
    ),
    size
  );
}

