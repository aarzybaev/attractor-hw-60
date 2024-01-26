export interface Message {
  _id: string;
  message: string;
  author: string;
  datetime: string;
}

export interface FormMessage {
  author: string;
  message: string;
}