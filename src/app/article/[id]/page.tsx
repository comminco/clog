import { API } from "@/utils/api";
import { ContentJson } from "@/interface/dataBason";
import { notFound } from "next/navigation";
import Link from "next/link";

/** 작성 글 상세페이지 */
export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const res = await API.GET();
  const contentJson: ContentJson = res;
  /** 작성 글 id */
  const { id } = await params;
  const numId = Number(id);
  /** DB에서 유저가 요청한 id에 맞는 데이터 찾기 */
  const content = contentJson.contentList.find(
    (content) => content.id === numId
  );

  /** 잘못된 id인 경우 404 page */
  if (!content) {
    notFound();
  }

  /** HTML CODE */
  return (
    <div>
      <Link href={"/article/list"} className={"text-xs"}>
        목록으로
      </Link>
      <div className={"mt-5"}>{content?.title}</div>
      <div className={"mt-2 text-sm"}>{content?.content}</div>
    </div>
  );
}
