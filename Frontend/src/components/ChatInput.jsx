import React, { useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { X, Image, Send } from 'lucide-react';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [imagaePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image')) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleSendMessage = async e => {
    e.preventDefault();
    if (!message.trim() && !imagaePreview) return;
    try {
      await sendMessage({
        message: message.trim(),
        media: imagaePreview,
      });
      setMessage('');
      removeImage();
    } catch (error) {
      console.log('Error sending message', error);
    }
  };

  return (
    <div className="w-full p-4">
      {imagaePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagaePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center cursor-pointer"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full rounded-lg input input-bordered input-sm sm:input-md"
          />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className={`hidden sm:flex  btn btn-circle 
              ${imagaePreview ? 'text-emerald-500' : 'text-zinc-500'}
              `}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          onClick={handleSendMessage}
          className="btn btn-sm btn-circle"
          disabled={!message.trim() && !imagaePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
