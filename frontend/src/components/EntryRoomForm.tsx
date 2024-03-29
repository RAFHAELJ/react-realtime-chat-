import { Button, Label, TextInput } from 'flowbite-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../websocket';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice';

export function EntryRoomForm() {
  const [nome, setNome] = useState('');
  const [room, setRoom] = useState('room1');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit('join', {
      room: room,
      nome: nome,
    });
    dispatch(
      updateUser({nome: nome,room: room,})
    );
    navigate('auth', { state: { nome: nome } });

    return;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full flex flex-col gap-3"
    >
     <div>
  <div className="block">
    <Label htmlFor="name" value="Seu Nome" />
  </div>
  <TextInput
    id="name"
    placeholder="Seu Nome" 
    required
    type="text" 
    onChange={(e) => setNome(e.target.value)}
  />
</div>
      <div>
        <label
          htmlFor="rooms"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
         Selecione a sala 
        </label>
        <select
          id="rooms"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option value="room1">Sala 1</option>
          <option value="room2">Sala 2</option>
          <option value="room3">Sala 3</option>
        </select>
      </div>
      <div className="col-span-2 text-right flex justify-end">
        <Button type="submit">Entre na sala </Button>
      </div>
    </form>
  );
}
