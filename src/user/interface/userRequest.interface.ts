export interface UserRequest extends Request {
  session?: { [key: string]: any };
  decoded?: any;
}
