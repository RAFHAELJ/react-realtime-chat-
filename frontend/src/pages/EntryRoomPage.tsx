import { EntryRoomForm } from '../components/EntryRoomForm';
import { Title } from '../components/Title';

export function EntryRoomPage() {
  return (
<div className="h-screen flex flex-col justify-center items-center p-5" style={{ background: '#d1d8e0' }}>
      <Title title="Escolha sua sala " />
      <EntryRoomForm />
    </div>
  );
}
