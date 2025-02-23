import { API } from "@/utils/api";
import Form from "next/form";
import { redirect } from "next/navigation";

/** json을 생성할 수 있는  */
export default function Dashboard() {
  async function handleSubmit(formData: FormData) {
    "use server"; // 서버 액션 지시어
    // 폼 데이터 처리 로직
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const res = await API.PUT("content", { title, content });

    if (res.status === "success") {
      redirect(`/article/${res.id}`);
    }
  }

  return (
    <div className={"h-full w-full flex-col f-c-c "}>
      <div>게시글 등록</div>
      <Form action={handleSubmit} className={"flex flex-col w-96"}>
        {/* On submission, the input value will be appended to 
          the URL, e.g. /search?query=abc */}
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
