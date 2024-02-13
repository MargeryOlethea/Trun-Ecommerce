import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { WishlistInput, WishlistModel } from "@/app/types/all.types";

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
const COLLECTION_WISHLIST = "wishlist";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

//get wishlist
export const getWishlist = async (userId: string) => {
  const db = await getDb();

  const agg = [
    {
      $match: {
        userId: new ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];

  const wishlist = (await db
    .collection(COLLECTION_WISHLIST)
    .aggregate(agg)
    .toArray()) as WishlistModel[];

  return wishlist;
};

//create wishlist
export const createWishlist = async (data: WishlistInput) => {
  const db = await getDb();

  const { productId, userId } = data;

  const doesWishlistExist = await db.collection(COLLECTION_WISHLIST).findOne({
    $and: [
      { productId: new ObjectId(productId) },
      { userId: new ObjectId(userId) },
    ],
  });

  if (doesWishlistExist) {
    throw new Error("DuplicateInput");
  }

  const newWishlist = await db.collection(COLLECTION_WISHLIST).insertOne({
    productId: new ObjectId(productId),
    userId: new ObjectId(userId),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const wishlist = (await db
    .collection(COLLECTION_WISHLIST)
    .findOne({ _id: newWishlist.insertedId })) as WishlistModel;

  return wishlist;
};

//delete wishlist
export const deleteWishlist = async (id: string) => {
  const db = await getDb();

  const wishlist = await db
    .collection(COLLECTION_WISHLIST)
    .findOne({ _id: new ObjectId(id) });

  if (!wishlist) {
    throw new Error("NotFound");
  }

  const deletedWishlist = await db
    .collection(COLLECTION_WISHLIST)
    .deleteOne({ _id: new ObjectId(id) });

  if (deletedWishlist.acknowledged) {
    return "Success delete wishlist";
  }
};
