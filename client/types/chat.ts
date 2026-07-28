export interface ChatMessage {
  type: "message";
  id: string;
  username: string;
  text: string;
  timestamp: number;
}

export interface SystemMessage {
  type: "system";
  id: string;
  text: string;
  timestamp: number;
}

export type ChatEvent = ChatMessage | SystemMessage;