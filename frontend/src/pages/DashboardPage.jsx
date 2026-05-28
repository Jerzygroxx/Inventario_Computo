import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../services/AuthContext';
import { CardSkeleton } from '../components/Skeleton';
import { toast } from '../services/toast';

const BASE_URL = '/api';

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error al cargar estadísticas');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadStats();
  }, [loadStats]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map(i => <CardSkeleton key={i} />)}
      </div>
    );
  }

  const totalPorEstado = stats?.porEstado || [];
  const totalPorCategoria = stats?.porCategoria || [];
  const ultimos = stats?.ultimos || [];

  const maxEstado = Math.max(...totalPorEstado.map(e => e.cantidad), 1);
  const maxCat = Math.max(...totalPorCategoria.map(c => c.cantidad), 1);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total equipos</p>
              <p className="text-2xl font-bold text-gray-800">{stats?.total || 0}</p>
            </div>
          </div>
        </div>

        {totalPorEstado.slice(0, 3).map((e, i) => {
          const colors = [
            { bg: 'bg-emerald-50', text: 'text-emerald-600' },
            { bg: 'bg-amber-50', text: 'text-amber-600' },
            { bg: 'bg-red-50', text: 'text-red-600' }
          ];
          const c = colors[i] || colors[0];
          return (
            <div key={e.nombre} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center`}>
                  <svg className={`w-5 h-5 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{e.nombre}</p>
                  <p className={`text-2xl font-bold ${c.text}`}>{e.cantidad}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Equipos por estado</h3>
          <div className="space-y-3">
            {totalPorEstado.map(e => (
              <div key={e.nombre}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{e.nombre}</span>
                  <span className="font-medium text-gray-800">{e.cantidad}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-slate-900 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(e.cantidad / maxEstado) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {totalPorEstado.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">Sin datos</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Equipos por categoría</h3>
          <div className="space-y-3">
            {totalPorCategoria.map(c => (
              <div key={c.nombre}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{c.nombre}</span>
                  <span className="font-medium text-gray-800">{c.cantidad}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(c.cantidad / maxCat) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {totalPorCategoria.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">Sin datos</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Últimos equipos agregados</h3>
        {ultimos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-3 py-2 text-xs text-gray-500 uppercase">Nombre</th>
                  <th className="text-left px-3 py-2 text-xs text-gray-500 uppercase">Marca</th>
                  <th className="text-left px-3 py-2 text-xs text-gray-500 uppercase">Categoría</th>
                  <th className="text-left px-3 py-2 text-xs text-gray-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ultimos.map(eq => (
                  <tr key={eq.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2.5 font-medium text-gray-800">{eq.nombre}</td>
                    <td className="px-3 py-2.5 text-gray-600">{eq.marca}</td>
                    <td className="px-3 py-2.5">
                      <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">{eq.categoria}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">{eq.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-6">No hay equipos registrados</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
