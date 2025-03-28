import { MessageSquare } from 'lucide-react';

const ChatContainer = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md space-y-6 text-center">
        <div className="flex justify-center mb-4 gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Welcome to Chatt App</h2>
        <p className="text-base-content/60">Start a conversation with a friend</p>
      </div>
    </div>
  );
};

export default ChatContainer;
