import { ImageResponse } from "next/og";

export const alt = "Cobrykz — Better systems. Stronger business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "72px",
          background: "#0b1728",
          color: "#ffffff",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>COBRYKZ</div>
        <div style={{ display: "flex", maxWidth: 900, flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#9cc8ff", fontSize: 24, fontWeight: 700 }}>
            TECHNOLOGY PARTNER
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 66, fontWeight: 700, lineHeight: 1.05 }}>
            Better systems. Stronger business.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
