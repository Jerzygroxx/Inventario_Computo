import { useState, useEffect } from 'react';
import { equiposApi, categoriasApi, estadosApi, ubicacionesApi } from '../services/api';
import EquipoForm from '../components/EquipoForm';

function EquiposPage() {
  const [equipos, setEquipos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [eq, cat, est, ubi] = await Promise.all([
        equiposApi.getAll(),
        categoriasApi.getAll(),
        estadosApi.getAll(),
        ubicacionesApi.getAll()
      ]);
      setEquipos(eq);
      setCategorias(cat);
      setEstados(est);
      setUbicaciones(ubi);
    } catch (err) {
      alert('Error al cargar datos: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data) {
    try {
      await equiposApi.create(data);
      setShowForm(false);
      loadAll();
    } catch (err) {
      alert('Error al crear: ' + err.message);
    }
  }

  async function handleUpdate(data) {
    try {
      await equiposApi.update(editing.id, data);
      setEditing(null);
      setShowForm(false);
      loadAll();
    } catch (err) {
      alert('Error al actualizar: ' + err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este equipo?')) return;
    try {
      await equiposApi.remove(id);
      loadAll();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  }

  function editEquipo(equipo) {
    setEditing(equipo);
    setShowForm(true);
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Equipos registrados</h2>
        {!showForm && (
          <button onClick={() => { setEditing(null); setShowForm(true); }}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo equipo
          </button>
        )}
      </div>

      {showForm && (
        <EquipoForm
          key={editing ? editing.id : 'new'}
          initialData={editing}
          categorias={categorias}
          estados={estados}
          ubicaciones={ubicaciones}
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Cargando...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">#</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Nombre</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Marca</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Modelo</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Categoría</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Estado</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Ubicación</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Adquisición</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {equipos.map(eq => (
                <tr key={eq.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3 text-gray-500">{eq.id}</td>
                  <td className="px-3 py-3 font-medium text-gray-800">{eq.nombre}</td>
                  <td className="px-3 py-3 text-gray-600">{eq.marca || '-'}</td>
                  <td className="px-3 py-3 text-gray-600">{eq.modelo || '-'}</td>
                  <td className="px-3 py-3">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {eq.categoria}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {eq.estado}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-600">{eq.ubicacion}</td>
                  <td className="px-3 py-3 text-gray-500">{eq.fecha_adquisicion || '-'}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => editEquipo(eq)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-2.5 py-1.5 rounded transition-colors">
                        Editar
                      </button>
                      <button onClick={() => handleDelete(eq.id)}
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-medium px-2.5 py-1.5 rounded transition-colors">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {equipos.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400">
                    No hay equipos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EquiposPage;
