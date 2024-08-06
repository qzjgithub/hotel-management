export type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  about: string | null;
  createdAt: string;
  image: string;
};
