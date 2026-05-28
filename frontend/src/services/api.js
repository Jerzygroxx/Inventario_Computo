const BASE_URL = '/api';

function getToken() {
  return localStorage.getItem('auth_token');
}

async function request(url, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${url}`, { headers, ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en la petición');
  return data;
}

export const equiposApi = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams();
    if (params.search) qs.set('search', params.search);
    if (params.categoria) qs.set('categoria', params.categoria);
    if (params.estado) qs.set('estado', params.estado);
    if (params.ubicacion) qs.set('ubicacion', params.ubicacion);
    const query = qs.toString();
    return request(`/equipos${query ? '?' + query : ''}`);
  },
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
