import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#09090B",
          color: "#FAFAFA",
          padding: 72,
          fontFamily: "ui-sans-serif, system-ui"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            color: "#A1A1AA",
            fontSize: 30
          }}
        >
          <div
            style={{
              width: 68,
              height: 68,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              border: "2px solid #27272A",
              background: "#111111",
              color: "#3B82F6"
            }}
          >
            $
          </div>
          Storeshots
        </div>
        <div style={{ marginTop: 48, maxWidth: 930, fontSize: 76, lineHeight: 1, fontWeight: 700 }}>
          Generate App Store Screenshots in One Command
        </div>
        <div style={{ marginTop: 34, color: "#A1A1AA", fontSize: 32 }}>
          Expo Router routes to App Store and Play Store assets.
        </div>
      </div>
    ),
    size
  );
}
