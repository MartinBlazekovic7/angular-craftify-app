export interface Tokens {
  accessToken: string;
  token: string;
  user: UserDTO;
}

export interface UserDTO {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  isPrivate?: boolean;
  userPreferences?: number[];
}
