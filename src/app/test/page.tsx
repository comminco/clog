import { API } from "@/utils/api";

export default async function Test() {
  const res = await API.GET("account");

  console.log("res", res);
  return <div>{res.data}</div>;
}
