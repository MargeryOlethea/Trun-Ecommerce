import { Collection, Db } from "mongodb";
import { getMongoClientInstance } from "../config";
import { ProductModel } from "@/app/types/all.types";

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
const COLLECTION_PRODUCTS = "products";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

//get products
export const getProducts = async (search: string | null, page: number) => {
  if (!search) {
    search = "";
  }

  const db = await getDb();

  const itemLimit = 8;
  const pageNumber = page || 1;

  const products = (await db
    .collection(COLLECTION_PRODUCTS)
    .find({ name: { $regex: `.*${search}.*`, $options: "i" } })
    .skip((pageNumber - 1) * itemLimit)
    .limit(8)
    .toArray()) as ProductModel[];

  return products;
};

//get product by slug
export const getProductBySlug = async (slug: string) => {
  const db = await getDb();

  const product = (await db
    .collection(COLLECTION_PRODUCTS)
    .findOne({ slug })) as ProductModel;

  if (!product) {
    throw new Error("NotFound");
  }

  return product;
};
