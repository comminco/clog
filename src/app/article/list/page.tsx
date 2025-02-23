import { ContentJson } from "@/interface/dataBason";
import { API } from "@/utils/api";
import Link from "next/link";

export const dynamic = "force-dynamic";

/** 글 목록을 가져옵니다.  */
export default async function ContentList() {
  const res = await API.GET("content");
  const contentJson: ContentJson = JSON.parse(res);
  return (
    <div>
      <div className={"mb-5"}>게시글 목록</div>
      {contentJson.contentList?.map(({ id, title }) => {
        return (
          <div key={`article-${id}`}>
            <Link href={`/article/${id}`}>{title}</Link>
          </div>
        );
      })}
    </div>
  );
}
