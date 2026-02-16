import { ImageResponse } from "next/og";

export const contentType = "image/png";

// Generate multiple icon sizes from one file.
export function generateImageMetadata() {
  return [
    {
      id: "192",
      size: { width: 192, height: 192 },
      contentType,
    },
    {
      id: "512",
      size: { width: 512, height: 512 },
      contentType,
    },
  ];
}

function IconGraphic({ size }: { size: number }) {
  const fontSize = Math.round(size * 0.42);
  const subtitleSize = Math.round(size * 0.14);

  return (
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
          borderRadius: Math.round(size * 0.18),
          border: `${Math.max(2, Math.round(size * 0.02))}px solid rgba(255,255,255,0.18)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: Math.round(size * 0.03),
          background: "rgba(255,255,255,0.06)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ fontSize, fontWeight: 800, letterSpacing: "-0.06em" }}>
          SDA
        </div>
        <div
          style={{
            fontSize: subtitleSize,
            fontWeight: 600,
            letterSpacing: "0.18em",
            opacity: 0.9,
          }}
        >
          HYMNAL
        </div>
      </div>
    </div>
  );
}

export default async function Icon({
  id,
}: {
  id: Promise<string>;
}): Promise<ImageResponse> {
  const resolvedId = await id;
  const size = resolvedId === "512" ? 512 : 192;

  return new ImageResponse(<IconGraphic size={size} />, {
    width: size,
    height: size,
  });
}

