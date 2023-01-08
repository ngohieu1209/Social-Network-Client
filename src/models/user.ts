export interface UserInformation {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  followers: number;
  following: number;
}

// export interface UpdateUser {
//   firstName?: string;
//   lastName?: string;
//   avatar?: null | string;
//   password?: string;
// }
