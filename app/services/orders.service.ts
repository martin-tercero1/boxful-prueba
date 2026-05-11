import api from '@/lib/api';
import type { CreateOrderPayload, OrderFilters } from '@/types/order.types';

export const ordersService = {
  create: (data: CreateOrderPayload) =>
    api.post('/orders', data),

  getAll: (filters?: OrderFilters) =>
    api.get('/orders', { params: filters }),
};