import { redirect } from "next/navigation";

/** "/" 경로로 접근 시 redirect */
export default function Home() {
  redirect("/article/list");
}
