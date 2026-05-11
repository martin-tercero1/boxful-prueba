export interface Product {
  height: number;
  length: number;
  width: number;
  weight: number;
  content: string;
}

export interface CreateOrderPayload {
  pickUpAddress: string;
  scheduledDate: string;
  firstNames: string;
  lastNames: string;
  email: string;
  phoneNumber: string;
  destinationAddress: string;
  department: string;
  municipality: string;
  referencePoint: string;
  indications: string;
  cashOnDelivery: boolean;
  cashAmount?: number;
  products: Product[];
}

export interface OrderFilters {
  status?: string;
  from?: string;
  to?: string;
  reference?: string;
  page?: number;
  limit?: number;
}