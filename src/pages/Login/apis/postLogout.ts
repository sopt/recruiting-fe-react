import { api } from '@/apis/api';

export const postLogout = async (): Promise<void> => {
  await api.post('recruiting-admin/signout');
};
