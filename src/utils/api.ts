import { Content } from "@/interface/content";
import axios from "axios";

const root = process.env.ROOT_URL ?? "";

/** API 액션을 정의 */
export const API = {
  GET: async function Get() {
    const res = await axios.get(`${root}/api`);
    return res.data;
  },
  CREATE: async function Create({ title, content }: Content) {
    const res = await axios.put(`${root}/api/`, { title, content });
    return res.data;
  },
};
