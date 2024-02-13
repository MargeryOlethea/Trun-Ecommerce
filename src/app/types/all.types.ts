import { ObjectId } from "mongodb";

export type FetchResponse<T> = {
  status: number;
  message?: string;
  data?: T;
  error?: string;
};

// PRODUCTS
export type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

// USER
export type UserModel = {
  _id: ObjectId;
  name?: string;
  username: string;
  email: string;
  password: string;
};

export type UserRegisterInput = Omit<UserModel, "_id">;

export type UserLoginInput = Pick<UserModel, "email" | "password">;

export type UserLoginPayload = {
  userId: ObjectId;
  username: string;
};

// WISHLIST
export type WishlistModel = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  product: ProductModel;
};

export type WishlistInput = {
  userId: string;
  productId: string;
};
