import BaseApi from '@logics/api/baseApi';
import { EventDetailResponseDto } from '../types/detail';

const eventApi = new BaseApi('');

export const getEventDetail = (contentId: string) =>
  eventApi.get<EventDetailResponseDto>(`/event/${contentId}`);
