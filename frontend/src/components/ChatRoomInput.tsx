import  { useState } from 'react';
import { socket } from '../websocket';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import EmojiPicker from 'emoji-picker-react'; // Importando o EmojiPicker
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';



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
      <div className="relative flex">
        <button onClick={() => setShowEmojiPicker(prev => !prev)}
        style={{
          fontSize: '1.5rem', // Tamanho maior do emoji
          
        }}> 😄 </button> 
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
        <button onClick={sendMessage} className="flex items-center">  
          <FontAwesomeIcon icon={faPaperPlane} size="2x" /> 
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
