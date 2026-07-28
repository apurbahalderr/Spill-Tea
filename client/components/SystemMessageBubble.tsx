import { SystemMessage } from '@/types/chat';

interface SystemMessageBubbleProps {
  message: SystemMessage;
}

export default function SystemMessageBubble({ message }: SystemMessageBubbleProps) {
  return (
    <div className="flex justify-center my-2">
      <span className="text-xs text-white bg-gray-800/50 px-3 py-1 rounded-full">
        {message.text}
      </span>
    </div>
  );
}