'use client';

import { useEffect, useState } from 'react';

export default function HistorialSolicitudes() {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos'); // todos, aprobadas, rechazadas

  useEffect(() => {
    // Datos de prueba del historial
    const datosPrueba = [
      {
        id: '001',
        fechaSolicitud: '2025-09-20',
        solicitante: 'Ana Gómez',
        bienes: 'Proyector',
        accion: 'rechazado',
        comentario: 'N/A',
        fechaAccion: '11/11/2025, 10:24:14'
      },
      {
        id: '002',
        fechaSolicitud: '2025-09-21',
        solicitante: 'Carlos Ruiz',
        bienes: 'Computador',
        accion: 'rechazado',
        comentario: 'Faltó algo',
        fechaAccion: '6/11/2025, 21:24:21'
      },
      {
        id: '001',
        fechaSolicitud: '2025-09-20',
        solicitante: 'Ana Gómez',
        bienes: 'Proyector',
        accion: 'aprobado',
        comentario: 'N/A',
        fechaAccion: '6/11/2025, 21:23:43'
      },
      {
        id: '001',
        fechaSolicitud: '2025-09-20',
        solicitante: 'Ana Gómez',
        bienes: 'Proyector',
        accion: 'rechazado',
        comentario: 'faltó un ítem',
        fechaAccion: '6/11/2025, 21:20:51'
      },
      {
        id: '001',
        fechaSolicitud: '2025-09-20',
        solicitante: 'Ana Gómez',
        bienes: 'Proyector',
        accion: 'aprobado',
        comentario: 'N/A',
        fechaAccion: '6/11/2025, 10:48:46'
      },
      {
        id: '001',
        fechaSolicitud: '2025-09-20',
        solicitante: 'Ana Gómez',
        bienes: 'Proyector',
        accion: 'rechazado',
        comentario: 'sin comentarios',
        fechaAccion: '6/11/2025, 10:14:15'
      },
      {
        id: '#2022999',
        fechaSolicitud: '2023-10-20',
        solicitante: 'Carlos López',
        bienes: '1 Cámara, 2 Micrófonos',
        accion: 'aprobado',
        comentario: 'N/A',
        fechaAccion: 'N/A'
      },
      {
        id: '#2022998',
        fechaSolicitud: '2023-10-18',
        solicitante: 'María Pérez',
        bienes: '5 Sillas',
        accion: 'rechazado',
        comentario: 'N/A',
        fechaAccion: 'N/A'
      },
      {
        id: '#2022997',
        fechaSolicitud: '2023-10-15',
        solicitante: 'José Martínez',
        bienes: '1 Laptop',
        accion: 'pendiente',
        comentario: 'N/A',
        fechaAccion: 'N/A'
      }
    ];

    setHistorial(datosPrueba);
    setLoading(false);
  }, []);

  const historialFiltrado = historial.filter(item => {
    if (filtro === 'todos') return true;
    if (filtro === 'aprobadas') return item.accion === 'aprobado';
    if (filtro === 'rechazadas') return item.accion === 'rechazado';
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39A900]"></div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      {/* Título */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#39A900] mb-2">
          Historial de Solicitudes
        </h1>
        <p className="text-gray-600">Registro de solicitudes aprobadas y rechazadas</p>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setFiltro('todos')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filtro === 'todos'
              ? 'bg-[#39A900] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Todas ({historial.length})
        </button>
        <button
          onClick={() => setFiltro('aprobadas')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filtro === 'aprobadas'
              ? 'bg-[#39A900] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Aprobadas ({historial.filter(h => h.accion === 'aprobado').length})
        </button>
        <button
          onClick={() => setFiltro('rechazadas')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filtro === 'rechazadas'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Rechazadas ({historial.filter(h => h.accion === 'rechazado').length})
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
        <table className="w-full border-collapse">
          {/* Header de la tabla */}
          <thead>
            <tr className="bg-gradient-to-r from-[#39A900] to-[#007832] text-white">
              <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wide border-r border-white/20">
                ID
              </th>
              <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wide border-r border-white/20">
                Fecha Solicitud
              </th>
              <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wide border-r border-white/20">
                Solicitante
              </th>
              <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wide border-r border-white/20">
                Bienes
              </th>
              <th className="px-4 py-4 text-center font-bold text-sm uppercase tracking-wide border-r border-white/20">
                Acción
              </th>
              <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wide border-r border-white/20">
                Comentario
              </th>
              <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wide">
                Fecha Acción
              </th>
            </tr>
          </thead>

          {/* Body de la tabla */}
          <tbody>
            {historialFiltrado.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                  No hay solicitudes {filtro === 'aprobadas' ? 'aprobadas' : filtro === 'rechazadas' ? 'rechazadas' : ''} en el historial
                </td>
              </tr>
            ) : (
              historialFiltrado.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 transition-colors border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-green-50/30'
                  }`}
                >
                  {/* ID */}
                  <td className="px-4 py-4 font-semibold text-gray-700 border-r border-gray-200">
                    {item.id}
                  </td>

                  {/* Fecha Solicitud */}
                  <td className="px-4 py-4 text-gray-600 text-sm border-r border-gray-200">
                    {item.fechaSolicitud}
                  </td>

                  {/* Solicitante */}
                  <td className="px-4 py-4 text-gray-800 border-r border-gray-200">
                    {item.solicitante}
                  </td>

                  {/* Bienes */}
                  <td className="px-4 py-4 text-gray-600 text-sm border-r border-gray-200">
                    {item.bienes}
                  </td>

                  {/* Acción */}
                  <td className="px-4 py-4 text-center border-r border-gray-200">
                    {item.accion === 'aprobado' && (
                      <span className="inline-block bg-[#39A900] text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Aprobado
                      </span>
                    )}
                    {item.accion === 'rechazado' && (
                      <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Rechazado
                      </span>
                    )}
                    {item.accion === 'pendiente' && (
                      <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Pendiente
                      </span>
                    )}
                  </td>

                  {/* Comentario */}
                  <td className="px-4 py-4 text-gray-600 text-sm border-r border-gray-200">
                    {item.comentario}
                  </td>

                  {/* Fecha Acción */}
                  <td className="px-4 py-4 text-gray-600 text-xs">
                    {item.fechaAccion}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Estadísticas */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-[#39A900]">
          <p className="text-gray-600 text-sm">Total Solicitudes</p>
          <p className="text-3xl font-bold text-gray-800">{historial.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-[#39A900]">
          <p className="text-gray-600 text-sm">Aprobadas</p>
          <p className="text-3xl font-bold text-[#39A900]">
            {historial.filter(h => h.accion === 'aprobado').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-red-600">
          <p className="text-gray-600 text-sm">Rechazadas</p>
          <p className="text-3xl font-bold text-red-600">
            {historial.filter(h => h.accion === 'rechazado').length}
          </p>
        </div>
      </div>
    </div>
  );
}
