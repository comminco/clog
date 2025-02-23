import { API } from "@/utils/api";
import { ContentJson } from "@/interface/dataBason";
import Link from "next/link";

/** 실제 작성 글 */
export default async function Article({ params }: { params: { id: string } }) {
  const res = await API.GET("content");
  const contentJson: ContentJson = JSON.parse(res);
  const id = Number(params.id);

  const content = contentJson.contentList.find((content) => content.id === id);
  if (!content) {
    return <div>잘못된 주소(id) 입니다.</div>;
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
