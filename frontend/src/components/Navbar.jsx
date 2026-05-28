import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-slate-800 text-white'
      : 'text-gray-300 hover:bg-slate-800 hover:text-white';

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold text-sm">Inventario de Cómputo</span>
            </Link>
            <div className="flex gap-1">
              <Link to="/" className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive('/')}`}>
                Dashboard
              </Link>
              <Link to="/equipos" className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive('/equipos')}`}>
                Equipos
              </Link>
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center text-xs font-medium text-white">
                  {user.nombre.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{user.nombre}</span>
              </div>
              <button
                onClick={logout}
                className="text-xs text-gray-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
