import bcrypt from "bcrypt";

const hashPassword = async (password: string) => bcrypt.hash(password, 10);
const comparePassword = (password: string, encrypted: string) =>
  bcrypt.compare(password, encrypted);

export { comparePassword, hashPassword };
