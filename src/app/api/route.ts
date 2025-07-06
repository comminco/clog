import fs from "fs";
import path from "path";
import { ContentJson } from "@/interface/dataBason";
import { Redis } from "@upstash/redis";

// Initialize Redis
const redis = Redis.fromEnv();

/** databason에서 json 읽기 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ json: string }> }
) {
  const { json: jsonName } = await params; // 'a', 'b', or 'c'
  const result = await redis.get(jsonName);
  console.log("result", result);

  try {
    return Response.json(result);
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

/** 생성하는 메소드 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ json: string }> }
) {
  const { json: jsonName } = await params; // 'a', 'b', or 'c'

  try {
    const { title, content } = await req.json();
    const contentObj = (await redis.get(jsonName)) as ContentJson;

    contentObj.contentIndex += 1;
    const id = contentObj.contentIndex;
    contentObj.contentList.push({
      id,
      title,
      content,
    });

    const result = await redis.set(jsonName, contentObj);
    console.log("put result", result);
    return Response.json({ status: "success", id }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

/** 수정하는 메소드 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ json: string }> }
) {
  const { json: jsonName } = await params; // 'a', 'b', or 'c'

  const filePath = path.join(
    process.cwd(),
    "public",
    `/databason/${jsonName}.json`
  ); // 프로젝트 내 파일 경로
  try {
    const data = fs.readFileSync(filePath, "utf-8"); // 동기 방식
    return Response.json(data);
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
