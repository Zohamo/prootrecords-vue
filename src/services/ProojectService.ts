import { Prooject } from "@/types";

export default {
  async all(): Promise<Prooject[]> {
    return fetch(`${process.env.VUE_APP_API_URL}/proojects`)
      .then((res) => res.json())
      .catch((error) => {
        console.log("get proojects", error);
      });
  },
  async get(slug: string): Promise<Prooject> {
    return fetch(`${process.env.VUE_APP_API_URL}/proojects/${slug}`)
      .then((res) => res.json())
      .catch((error) => {
        console.log("get prooject", error);
      });
  },
};
