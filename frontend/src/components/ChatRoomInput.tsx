import  { useState } from 'react';
import { socket } from '../websocket';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import EmojiPicker from 'emoji-picker-react'; // Importando o EmojiPicker

interface Message {
  room: string;
  author: string;
  message: string;  
}

export function ChatRoomInput() {
  const user = useSelector((state: RootState) => state.user);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const sendMessage = async () => {
    if (message !== '' && socket) {
      const data: Message = {
        room: user.room,
        author: user.nome,
        message: message,
      };
      await socket.emit('new_message', data);
      setMessage('');
      setShowEmojiPicker(false); // Fechar os emojis quando a mensagem é enviada
    }
  };

  const handleEmojiClick = (emoji: any) => {
    setMessage(prevMessage => prevMessage + emoji.emoji);
  };

  return (
    <div className="max-w-md w-full flex flex-col gap-3" style={{ marginTop: 'auto' }}>
    <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >        
      </label>
      <div className="relative">
        <textarea
          id="message"
          rows={1}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Digite sua mensagem aqui..."
        />
      </div>
      <div className="flex justify-between items-left" style={{ width: '100%' }}>
        <button onClick={() => setShowEmojiPicker(prev => !prev)}> 😄 </button>
        <button onClick={sendMessage} className="flex items-left justiy-center p-2 bg-blue-500 text-white rounded-full transition-colors duration-300 hover:bg-blue-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M13.293 6.293a1 1 0 0 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 0 1 1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          height={400}
          width="100%"
        />
      )}
    </div>
  );
}
