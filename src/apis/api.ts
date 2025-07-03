import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
});

export const tokenApi = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  headers: {
    // TODO: 로컬스토리지에서 받아오는 걸로 수정
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
});
