import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
