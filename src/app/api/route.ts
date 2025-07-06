import { ContentJson } from "@/interface/dataBason";
import { Redis } from "@upstash/redis";
/** CRUD를 메소드로 구분합니다. */

const redis = Redis.fromEnv();

/** redis에 있는 모든 정보 가져오기 */
export async function GET() {
  const result = await redis.get("content");

  try {
    return Response.json(result);
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

/** 글 생성 메소드 */
export async function PUT(req: Request) {
  try {
    const { title, content } = await req.json();
    /** 현재 redis 정보 가져옴 */
    const contentObj = (await redis.get("content")) as ContentJson;

    contentObj.contentIndex += 1;
    const id = contentObj.contentIndex;
    contentObj.contentList.push({
      id,
      title,
      content,
    });
    /** 새글 Redis에 저장 */
    const result = await redis.set("content", contentObj);
    console.log("put result", result);
    return Response.json({ status: "success", id }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
