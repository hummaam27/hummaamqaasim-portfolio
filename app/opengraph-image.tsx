import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.author.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
  const fontData = await readFile(
    path.join(process.cwd(), "app/_assets/og-serif.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#F5EFE3",
          fontFamily: "Serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 18,
            letterSpacing: 4,
            color: "#B95A3A",
            textTransform: "uppercase",
            fontFamily: "Serif",
          }}
        >
          <span>Hummaamqaasim.com</span>
          <span
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "rgba(45,38,32,0.20)",
              marginLeft: 12,
              maxWidth: 480,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 124,
              lineHeight: 1.0,
              letterSpacing: -2,
              color: "#2D2620",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.2,
              color: "#B95A3A",
              fontStyle: "italic",
            }}
          >
            {siteConfig.author.role}
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 24,
              lineHeight: 1.4,
              color: "#6B5F54",
              maxWidth: 880,
            }}
          >
            Production Microsoft Fabric Medallion lakehouses and governed Power BI semantic models.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#A39584",
            fontFamily: "Serif",
            fontStyle: "italic",
          }}
        >
          <span>Built with care from Annapolis.</span>
          <span style={{ fontStyle: "normal", letterSpacing: 2 }}>
            {siteConfig.author.location.split(",")[0].toUpperCase()}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Serif",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
