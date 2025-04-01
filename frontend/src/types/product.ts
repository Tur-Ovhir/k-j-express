export type productType = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  isDisabled: boolean;
  categoryId: number;
  createdAt: string;
};

export type categoryType = {
  id: number;
  name: string;
};

export type userType = {
  id: number;
  name: string;
};

export type orderType = {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  items: productType[];
};
