export default interface JWTPayload {
  role: string;
  name: string;
  email: string;
  avatar: string;
  is_blocked: boolean;
  rank?: string;
  _id: string;
}
