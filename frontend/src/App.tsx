import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EntryRoomPage } from './pages/EntryRoomPage';
import { Navigate, Outlet } from 'react-router-dom';
import { ChatRoomPage } from './pages/ChatRoomPage';
import { AuthenticationPage } from './pages/AuthenticationPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

interface ProtectedRouteProps {
  redirectPath: string;
}

export function ProtectedRoute({ redirectPath = '' }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.user);
  if (!(user.nome && user.room)) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<EntryRoomPage />} />
        <Route element={<ProtectedRoute redirectPath="" />}>
        <Route path="auth" element={<AuthenticationPage />} />
          <Route path="room" element={<ChatRoomPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
