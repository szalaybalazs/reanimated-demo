export interface iBase {
  id: string;
  name: string;
}

export interface iAttachment {
  id: string;
  key?: string;
  url: string;
  size?: number;
  role?: string;
}
