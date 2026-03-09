import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "anagnorisis";

  const fontUrl = new URL("/geistmono.woff2", req.url);
  const font = await fetch(fontUrl).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "64px 80px",
          fontFamily: "monospace",
        }}
      >
        {/* top bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            {["home", "about", "writing"].map((item) => (
              <span
                key={item}
                style={{ fontSize: 24, color: "#666", letterSpacing: "0.05em" }}
              >
                {item}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 24, color: "#333" }}>
            undefinedcode.pages.dev
          </span>
        </div>

        {/* divider */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "1px",
            background: "repeating-linear-gradient(90deg, #333 0px, #333 6px, transparent 6px, transparent 12px)",
          }}
        />

        {/* title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 28, color: "#444" }}>//</span>
          <span
            style={{
              fontSize: 72,
              color: "#e0e0e0",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </span>
        </div>

        {/* bottom divider */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "1px",
            background: "repeating-linear-gradient(90deg, #333 0px, #333 6px, transparent 6px, transparent 12px)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "monospace",
          data: font,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}