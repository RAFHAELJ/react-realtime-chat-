import { useEffect, useState, useRef } from 'react';
import { ChatRoomMessage } from './ChatRoomMessage';
import { socket } from '../websocket';

interface Message {
  room: string;
  author: string;
  message: string;
}

export function ChatRoomMessageList() {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((prevList) => [data, ...prevList]); // Adiciona a nova mensagem no início da lista
    });
  }, []);

  useEffect(() => {
    // Ao atualizar a lista de mensagens, rolar para o final
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <div className="max-w-md w-full flex flex-col gap-3 overflow-y-auto" ref={messageListRef}style={{ background: 'lightgreen', border: '0px solid black', height: '79vh', width: '50vw' }}>
      {messageList.slice(0).reverse().map((message, index) => ( // Inverte a ordem das mensagens e, em seguida, renderiza
        <ChatRoomMessage
          room={message.room}
          author={message.author}
          message={message.message}
          key={index}
        />
      ))}
    </div>
  );
}
