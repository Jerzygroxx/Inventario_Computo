import { useState } from 'react';

const emptyForm = {
  nombre: '',
  marca: '',
  modelo: '',
  numero_serie: '',
  fecha_adquisicion: '',
  observaciones: '',
  id_categoria: '',
  id_estado: '',
  id_ubicacion: ''
};

function getInitialForm(initialData) {
  if (!initialData) return emptyForm;
  return {
    nombre: initialData.nombre || '',
    marca: initialData.marca || '',
    modelo: initialData.modelo || '',
    numero_serie: initialData.numero_serie || '',
    fecha_adquisicion: initialData.fecha_adquisicion || '',
    observaciones: initialData.observaciones || '',
    id_categoria: initialData.id_categoria || '',
    id_estado: initialData.id_estado || '',
    id_ubicacion: initialData.id_ubicacion || ''
  };
}

function EquipoForm({ initialData, categorias, estados, ubicaciones, onSubmit, onCancel }) {
  const [form, setForm] = useState(getInitialForm(initialData));

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.nombre.trim()) {
      alert('El nombre del equipo es obligatorio');
      return;
    }
    if (!form.id_categoria || !form.id_estado || !form.id_ubicacion) {
      alert('Debe seleccionar categoría, estado y ubicación');
      return;
    }
    await onSubmit({
      ...form,
      id_categoria: Number(form.id_categoria),
      id_estado: Number(form.id_estado),
      id_ubicacion: Number(form.id_ubicacion)
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">
        {initialData ? '✏️ Editar equipo' : '➕ Nuevo equipo'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Nombre *</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Marca</label>
          <input name="marca" value={form.marca} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Modelo</label>
          <input name="modelo" value={form.modelo} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">N° Serie</label>
          <input name="numero_serie" value={form.numero_serie} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Fecha de adquisición</label>
          <input type="date" name="fecha_adquisicion" value={form.fecha_adquisicion} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Categoría *</label>
          <select name="id_categoria" value={form.id_categoria} onChange={handleChange} required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
            <option value="">Seleccione...</option>
            {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Estado *</label>
          <select name="id_estado" value={form.id_estado} onChange={handleChange} required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
            <option value="">Seleccione...</option>
            {estados.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Ubicación *</label>
          <select name="id_ubicacion" value={form.id_ubicacion} onChange={handleChange} required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
            <option value="">Seleccione...</option>
            {ubicaciones.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
          </select>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">Observaciones</label>
          <textarea name="observaciones" value={form.observaciones} onChange={handleChange} rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y" />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button type="submit"
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors">
          {initialData ? 'Actualizar' : 'Guardar'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-5 py-2 rounded-lg text-sm transition-colors">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default EquipoForm;
