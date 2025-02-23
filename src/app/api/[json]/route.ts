import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { ContentJson } from "@/interface/dataBason";

/** databason에서 json 읽기 */
export async function GET(
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
    return Response.json("error", { status: 500 });
  }
}

/** 생성하는 메소드 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ json: string }> }
) {
  const { json: jsonName } = await params; // 'a', 'b', or 'c'

  const filePath = path.join(
    process.cwd(),
    "public",
    `/databason/${jsonName}.json`
  ); // 프로젝트 내 파일 경로

  try {
    const contentJsonStr = fs.readFileSync(filePath, "utf-8");
    const { title, content } = await req.json();
    const contentObj: ContentJson = JSON.parse(contentJsonStr);

    contentObj.contentIndex += 1;
    const id = contentObj.contentIndex;
    contentObj.contentList.push({
      id,
      title,
      content,
    });
    /** 파일 쓰기 */
    fs.writeFileSync(filePath, JSON.stringify(contentObj), "utf-8");
    return Response.json({ status: "success", id }, { status: 200 });
  } catch (error) {
    return Response.json("error", { status: 500 });
  }
}

/** 수정하는 method */
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
    return Response.json("error", { status: 500 });
  }
}
