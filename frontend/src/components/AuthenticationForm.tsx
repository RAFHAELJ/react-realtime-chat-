import { Button, Label, TextInput } from 'flowbite-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../websocket';
import { useDispatch ,useSelector} from 'react-redux';
import { updateUser } from '../redux/userSlice';


export function AuthenticationForm({ nome }: { nome: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aqui você pode realizar a autenticação, como verificar se o e-mail e a senha correspondem a um usuário válido fixo para nao usar base de dados
    const authenticatedEmail = 'TesteCh@t';
    const authenticatedPassword = '123456';
    

    if (email === authenticatedEmail && password === authenticatedPassword) {
      // Autenticação bem-sucedida
      // Emitir evento para entrar na sala de chat
      socket?.emit('join', {
        room: user.room, // Sala padrão ou sala de sua escolha
        nome: nome,
      });
      
      // Atualizar o estado global do usuário
      dispatch(
        updateUser({
          nome: nome,
          room: user.room, // Sala padrão ou sala de sua escolha
        })
      );

      // Navegar para a página da sala de chat
      navigate('/room');
    } else {
      // Autenticação falhou, você pode exibir uma mensagem de erro ou fazer outra coisa
      alert('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full flex flex-col gap-3"
    >
      <div>
        <div className="block">
          <Label htmlFor="email" value="Seu email" />
        </div>
        <TextInput
          id="email"
          placeholder="nome@example.com"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="block">
          <Label htmlFor="password" value="Sua senha" />
        </div>
        <TextInput
          id="password"
          placeholder="Digite sua senha"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="col-span-2 text-right flex justify-end">
        <Button type="submit">Entrar</Button>
      </div>
    </form>
  );
}
