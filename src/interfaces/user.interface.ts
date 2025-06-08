export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  document: { type: string; url: string }[] | null;
  roles: string[];
  isVerified: boolean;
  isActive: boolean;
}

export interface IUpdateUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: File | null;
  phoneNumber?: string;
  document?: File[] | null;
  roles?: string[];
}
