import { get, patch, post } from "./index";
import { LatLngLiteral } from "leaflet";

export type INoticeType = {
  id: number;
  userId: number;
  phone: string;
  desc: string;
  title: string;
  address: string;
  position: LatLngLiteral;
};

export const getNotices = () => {
  return get<INoticeType[]>(`/notices`);
};
export const newNotice = (data: Partial<INoticeType>) => {
  return post(`/notices`, data);
};
export const patchNotice = (data: Partial<INoticeType>, id: string) => {
  return patch(`/notices/${id}`, data);
};

export const getNotice = (id: number) => {
  return get<INoticeType>(`/notices/${id}`);
};
