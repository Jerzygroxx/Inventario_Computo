const BASE_URL = '/api';

async function request(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en la petición');
  return data;
}

export const equiposApi = {
  getAll: () => request('/equipos'),
  getById: (id) => request(`/equipos/${id}`),
  create: (data) => request('/equipos', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/equipos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/equipos/${id}`, { method: 'DELETE' })
};

export const categoriasApi = {
  getAll: () => request('/categorias')
};

export const estadosApi = {
  getAll: () => request('/estados')
};

export const ubicacionesApi = {
  getAll: () => request('/ubicaciones')
};
