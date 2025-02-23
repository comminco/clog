import { Content } from "@/interface/content";
import axios from "axios";

const root = process.env.ROOT_URL;
console.log("root", root);
export const API = {
  GET: async function Get(jsonName: string) {
    console.log("api jsonanme", jsonName);
    const res = await axios.get(`${root}/api/${jsonName}`);
    return res.data;
  },
  PUT: async function Put(jsonName: string, { title, content }: Content) {
    const res = await axios.put(`${root}/api/${jsonName}`, { title, content });
    return res.data;
  },
};
