import {MessageType} from '../../message.type';

export type WebviewContainerProps = {
  navigation: any;
  route: any;
};

export type ParsedMessage = {
  type: MessageType;
  message?: string;
};
