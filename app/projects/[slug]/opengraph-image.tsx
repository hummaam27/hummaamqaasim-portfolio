import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const fontData = await readFile(
    path.join(process.cwd(), "app/_assets/og-serif.ttf"),
  );

  const title = project?.title ?? "Project";
  const description = project?.description ?? "";
  const year = project ? new Date(project.date).getFullYear() : "";

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
          <span>Project · {year}</span>
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

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: title.length > 40 ? 76 : 96,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: "#2D2620",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.4,
                color: "#6B5F54",
                maxWidth: 960,
              }}
            >
              {description}
            </div>
          ) : null}
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
          <span>Hummaam Qaasim</span>
          <span style={{ fontStyle: "normal", letterSpacing: 2 }}>
            HUMMAAMQAASIM.COM
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
