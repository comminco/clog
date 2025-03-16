import { Redis } from "@upstash/redis";

// Initialize Redis
const redis = Redis.fromEnv();

/** 초기 key value 생성 */
export async function GET() {
  try {
    await redis.set("content", {
      contentIndex: 0,
      contentList: [],
    });
    return Response.json({ status: "success" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
