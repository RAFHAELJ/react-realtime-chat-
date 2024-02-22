import { AuthenticationForm } from '../components/AuthenticationForm';
import { useLocation } from 'react-router-dom'; // Importe o useLocation
import { Title } from '../components/Title';

export function AuthenticationPage() {
  const location = useLocation();
  const nome = location.state?.nome || ''; 

  return (
<div className="h-screen flex flex-col justify-center items-center p-5" style={{ background: '#d1d8e0' }}>
    <Title title="Insira sua senha para entrar " /> 
      <AuthenticationForm nome={nome} /> 
    </div>
  );
}
