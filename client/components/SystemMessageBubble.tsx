import { SystemMessage } from "@/types/chat";

interface SystemMessageBubbleProps {
  message: SystemMessage;
}

export default function SystemMessageBubble({
  message,
}: SystemMessageBubbleProps) {
  return (
    <div className="flex justify-center my-2">
      <span className="text-xs text-gray-600 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-full">
        {message.text}
      </span>
    </div>
  );
}
