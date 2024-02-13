import bcryptjs from "bcryptjs";

export const hashPassword = (password: string): string => {
  return bcryptjs.hashSync(password);
};

export const comparePassword = (
  password: string,
  hashedPassword: string,
): boolean => {
  return bcryptjs.compareSync(password, hashedPassword);
};
