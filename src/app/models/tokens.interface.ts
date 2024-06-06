export interface Tokens {
  accessToken: string;
  token: string;
  user: UserDTO;
}

export interface UserDTO {
  id: number;
  name: string;
  username: string;
  admin: boolean;
}
