import { NextRequest, NextResponse } from "next/server";
import * as ytdl from "ytdl-core";

export async function GET(req = NextRequest()) {
  const ytLink = await req.headers.get("YT-Url");

  const { formats } = await ytdl.getInfo(String(ytLink));
  const finalData = [];

  const attr = [
    "itag",
    "mimeType",
    "container",
    "qualityLabel",
    "width",
    "height",
    "bitrate",
    "codecs",
    "videoCodec",
    "fps",
    "hasAudio",
  ];

  for (let format of formats) {
    let dataFromInfo = {};

    if (format.container === "mp4") {
      if (
        (format.videoCodec?.includes("av01") &&
          !["2160p", "4320p", "1440p"].some((t) =>
            format.qualityLabel.includes(t)
          )) ||
        format.hasAudio
      ) {
        continue;
      }

      attr.forEach((a) => (dataFromInfo[a] = format[a]));

      finalData.push(dataFromInfo);
    }
  }

  return NextResponse.json({ formats: finalData }, { status: 200 });
}
