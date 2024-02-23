import { ChatRoomInput } from '../components/ChatRoomInput';
import { ChatRoomMessageList } from '../components/ChatRoomMessageList';
import { Title } from '../components/Title';


export function ChatRoomPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center p-5 gap-8" style={{marginTop: 'auto', background: 'blue', border: '2px solid black', height: '100vh', width: '100vw' }}>
    <div style={{ 
      border: '2px solid lightblue',
      background: 'lightblue', 
      padding: '10px', 
      borderRadius: '5px',
      width: '30%', // largura de 30%
      height: '80%', // altura de 80%
      overflowY: 'auto', // Adiciona uma barra de rolagem vertical quando necessário
      boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.9)', // Adiciona um sombreamento ao redor da div
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centraliza os itens horizontalmente
    }}>
      <div style={{
        width: '100%',
        height: '2px',
        background: 'linear-gradient(to right, #3F51B5, #1976D2)', // Barra com uma tonalidade diferente de azul
      }} />
      <Title title="Sala de Chat" />
      <ChatRoomMessageList />
      <ChatRoomInput />
    </div>
  </div>
  
  
  );
}
