import { API } from "@/utils/api";
import { ContentJson } from "@/interface/dataBason";
import Link from "next/link";

/** 실제 작성 글 */
export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const res = await API.GET("content");
  const contentJson: ContentJson = res;
  const { id } = await params;
  const numId = Number(id);

  const content = contentJson.contentList.find(
    (content) => content.id === numId
  );
  if (!content) {
    return <div>잘못된 경로 입니다.</div>;
  }
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
