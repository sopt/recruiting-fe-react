import ky from "ky";

export const api = ky.create({
  // 서버 url 추가
  prefixUrl: "https:",
  headers: {
    Authorization: "Bearer my-token",
  },
});
