import { Db } from "mongodb";
import { getMongoClientInstance } from "../config";
import {
  UserLoginInput,
  UserLoginPayload,
  UserModel,
  UserRegisterInput,
} from "@/app/types/all.types";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { signToken } from "../utils/jose";

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
const COLLECTION_USERS = "users";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

const userRegistrationValidation = async (username: string, email: string) => {
  const db = await getDb();
  const user = await db
    .collection(COLLECTION_USERS)
    .findOne({ $or: [{ username }, { email }] });

  if (user) {
    throw new Error("RegisteredAccount");
  }
};

//register
export const createUser = async (data: UserRegisterInput) => {
  const { email, name, username, password } = data;
  // validation
  await userRegistrationValidation(username, email);

  const hashedPassword = hashPassword(password);

  // proses
  const db = await getDb();

  const newUser = await db
    .collection(COLLECTION_USERS)
    .insertOne({ email, username, name, password: hashedPassword });

  const user = (await db
    .collection(COLLECTION_USERS)
    .findOne(
      { _id: newUser.insertedId },
      { projection: { password: 0 } },
    )) as UserModel;

  return user;
};

//login
export const login = async (data: UserLoginInput) => {
  const { email, password } = data;

  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USERS)
    .findOne({ email })) as UserModel;

  if (!user) {
    throw new Error("InvalidCredentials");
  }

  const isRightPassword: boolean = comparePassword(password, user.password);

  if (!isRightPassword) {
    throw new Error("InvalidCredentials");
  }

  const payload: UserLoginPayload = {
    userId: user._id,
    username: user.username,
  };

  const token = await signToken(payload);

  return token;
};
