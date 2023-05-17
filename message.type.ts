export enum MessageType {
  ROUTE = 'ROUTE',
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
}

export interface MessageValue {
  payload: string;
}

export interface PostMessage {
  type: MessageType;
  message: MessageValue;
}
