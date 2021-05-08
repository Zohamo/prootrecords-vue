import { Release } from "@/types";

export default {
  async all(): Promise<Release[]> {
    return fetch(`${process.env.VUE_APP_API_URL}/releases`)
      .then((res) => res.json())
      .catch((error) => {
        console.log("get releases", error);
      });
  },
  async get(ref: string): Promise<Release> {
    return fetch(`${process.env.VUE_APP_API_URL}/releases/${ref}`)
      .then((res) => res.json())
      .catch((error) => {
        console.log("get release", error);
      });
  },
};
