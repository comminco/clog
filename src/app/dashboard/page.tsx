import { API } from "@/utils/api";
import Form from "next/form";
import { redirect } from "next/navigation";

/** 글쓰기  */
export default function Dashboard() {
  async function handleFormSubmit(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    /** 콘텐츠 생성 요청 */
    const res = await API.CREATE("content", { title, content });

    if (res.status === "success") {
      redirect(`/article/${res.id}`);
    }
  }

  return (
    <div className={"h-full w-full flex-col f-c-c "}>
      <div>게시글 등록</div>
      <Form action={handleFormSubmit} className={"flex flex-col w-96"}>
        <div>제목</div>
        <input required name="title" />
        <div>내용</div>
        <textarea className={"h-96"} required name="content" />
        <button className={"mt-5"} type="submit">
          등록
        </button>
      </Form>
    </div>
  );
}
