'use client';

import { useEffect, useState } from 'react';

export default function RevisarSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarRechazo, setMostrarRechazo] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState('');

  useEffect(() => {
    // Datos de prueba basados en la imagen
    const datosPrueba = [
      {
        codigo: 'SOL-021',
        cuentadantes: ['Ana Pérez'],
        numBienes: 1,
        fechaSalida: '2025-10-17',
        fechaRegreso: '2025-10-18',
        bienes: [
          { objeto: 'Laptop HP', marca: 'HP', modelo: 'Pavilion 15', placa: 'LAP-2024-001' }
        ],
        motivo: 'Trabajo de campo en zona rural',
        destino: 'Vereda El Carmen - Municipio de Cajicá',
        solicitante: 'Ana Pérez'
      },
      {
        codigo: 'SOL-022',
        cuentadantes: ['Luis Gómez', 'María Torres'],
        numBienes: 2,
        fechaSalida: '2025-10-18',
        fechaRegreso: '2025-10-20',
        bienes: [
          { objeto: 'Portátil', marca: 'Dell', modelo: '540', placa: '11199997' },
          { objeto: 'Mouse Inalámbrico', marca: 'Logitech', modelo: 'M185', placa: 'MOUSE-2024-089' }
        ],
        motivo: 'Trabajo de oficina y desarrollo',
        destino: 'Oficina 302 - Bloque B',
        solicitante: 'Luis Gómez'
      },
      {
        codigo: 'SOL-023',
        cuentadantes: ['Carlos Rodríguez'],
        numBienes: 1,
        fechaSalida: '2025-10-20',
        fechaRegreso: '2025-10-22',
        bienes: [
          { objeto: 'Proyector', marca: 'Epson', modelo: 'PowerLite', placa: 'PROY-2024-015' }
        ],
        motivo: 'Presentación en evento académico',
        destino: 'Auditorio Principal - Edificio A',
        solicitante: 'Carlos Rodríguez'
      },
      {
        codigo: 'SOL-024',
        cuentadantes: ['Sofía Herrera', 'Luis Fernández', 'María Gómez'],
        numBienes: 3,
        fechaSalida: '2025-10-23',
        fechaRegreso: '2025-10-25',
        bienes: [
          { objeto: 'Cámara Digital', marca: 'Canon', modelo: 'EOS Rebel', placa: 'CAM-2024-003' },
          { objeto: 'Trípode', marca: 'Manfrotto', modelo: 'Compact', placa: 'TRI-2024-012' },
          { objeto: 'Micrófono', marca: 'Shure', modelo: 'SM58', placa: 'MIC-2024-007' }
        ],
        motivo: 'Grabación de material educativo',
        destino: 'Estudio de Grabación - Bloque C',
        solicitante: 'Sofía Herrera'
      },
      {
        codigo: 'SOL-025',
        cuentadantes: ['Carlos Rodríguez'],
        numBienes: 1,
        fechaSalida: '2025-10-24',
        fechaRegreso: '2025-10-26',
        bienes: [
          { objeto: 'Tablet', marca: 'Samsung', modelo: 'Galaxy Tab S7', placa: 'TAB-2024-021' }
        ],
        motivo: 'Capacitación externa',
        destino: 'Centro de Convenciones - Bogotá',
        solicitante: 'Carlos Rodríguez'
      }
    ];

    setSolicitudes(datosPrueba);
    setLoading(false);
  }, []);

  const handleVerDetalle = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setMostrarConfirmacion(false);
    setMostrarRechazo(false);
    setMotivoRechazo('');
    setSolicitudSeleccionada(null);
  };

  const handleAprobar = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarAprobacion = () => {
    if (!solicitudSeleccionada) return;
    // Aquí iría la llamada a la API para aprobar
    alert(`Solicitud ${solicitudSeleccionada.codigo} aprobada exitosamente`);
    cerrarModal();
  };

  const handleRechazar = () => {
    setMostrarRechazo(true);
  };

  const confirmarRechazo = () => {
    if (!solicitudSeleccionada) return;
    if (!motivoRechazo.trim()) {
      alert('Debes indicar el motivo del rechazo');
      return;
    }
    // Aquí iría la llamada a la API para rechazar
    alert(`Solicitud ${solicitudSeleccionada.codigo} rechazada.\nMotivo: ${motivoRechazo}`);
    cerrarModal();
  };

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
          Gestión de Solicitudes
        </h1>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
        {/* Header de la tabla */}
        <div className="bg-gradient-to-r from-[#39A900] to-[#007832] text-white">
          <div className="grid grid-cols-6 gap-4 px-6 py-4 font-bold text-sm uppercase tracking-wide">
            <div>Código</div>
            <div>Cuentadantes</div>
            <div className="text-center">N° Bienes</div>
            <div className="text-center">Fecha Salida</div>
            <div className="text-center">Fecha Regreso</div>
            <div className="text-center">Acciones</div>
          </div>
        </div>

        {/* Body de la tabla */}
        <div className="divide-y divide-gray-100">
          {solicitudes.map((solicitud, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors items-center"
            >
              {/* Código */}
              <div className="font-bold text-gray-800 text-lg">
                {solicitud.codigo}
              </div>

              {/* Cuentadantes */}
              <div className="text-gray-600">
                {solicitud.cuentadantes.map((nombre, idx) => (
                  <div key={idx} className="text-sm">
                    {nombre}
                  </div>
                ))}
              </div>

              {/* N° Bienes */}
              <div className="text-center font-semibold text-gray-700">
                {solicitud.numBienes}
              </div>

              {/* Fecha Salida */}
              <div className="text-center text-gray-600 text-sm">
                {solicitud.fechaSalida}
              </div>

              {/* Fecha Regreso */}
              <div className="text-center text-gray-600 text-sm">
                {solicitud.fechaRegreso}
              </div>

              {/* Acciones */}
              <div className="text-center">
                <button
                  onClick={() => handleVerDetalle(solicitud)}
                  className="bg-[#39A900] hover:bg-[#007832] text-white font-semibold px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Ver Detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalles */}
      {modalAbierto && solicitudSeleccionada && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-[#39A900] to-[#007832] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📋</span>
                <h2 className="text-2xl font-bold">
                  Detalles de la Solicitud: {solicitudSeleccionada.codigo}
                </h2>
              </div>
              <button
                onClick={cerrarModal}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              {/* Tabla de Bienes */}
              <div className="mb-6">
                <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-200">
                  <div className="bg-gradient-to-r from-[#39A900] to-[#007832] text-white grid grid-cols-4 gap-4 px-4 py-3 font-bold text-sm">
                    <div>OBJETO</div>
                    <div>MARCA</div>
                    <div>MODELO</div>
                    <div>PLACA</div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {solicitudSeleccionada.bienes.map((bien, idx) => (
                      <div key={idx} className="grid grid-cols-4 gap-4 px-4 py-3 hover:bg-gray-50">
                        <div className="text-gray-800">{bien.objeto}</div>
                        <div className="text-gray-600">{bien.marca}</div>
                        <div className="text-gray-600">{bien.modelo}</div>
                        <div className="text-gray-800 font-semibold">{bien.placa}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Información Adicional */}
              <div className="bg-green-50 border-l-4 border-[#39A900] rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="text-[#39A900] font-bold text-sm mb-1">USO O MOTIVO</h3>
                  <p className="text-gray-700">{solicitudSeleccionada.motivo}</p>
                </div>

                <div>
                  <h3 className="text-[#39A900] font-bold text-sm mb-1">DESTINO</h3>
                  <p className="text-gray-700">{solicitudSeleccionada.destino}</p>
                </div>

                <div>
                  <h3 className="text-[#39A900] font-bold text-sm mb-1">NOMBRE SOLICITANTE</h3>
                  <p className="text-gray-700">{solicitudSeleccionada.solicitante}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-[#39A900] font-bold text-sm mb-1">FECHA SALIDA</h3>
                    <p className="text-gray-700">{solicitudSeleccionada.fechaSalida}</p>
                  </div>
                  <div>
                    <h3 className="text-[#39A900] font-bold text-sm mb-1">FECHA REGRESO</h3>
                    <p className="text-gray-700">{solicitudSeleccionada.fechaRegreso}</p>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              {!mostrarConfirmacion && !mostrarRechazo && (
                <div className="flex gap-4 mt-6 justify-end">
                  <button
                    onClick={handleAprobar}
                    className="bg-[#39A900] hover:bg-[#007832] text-white font-bold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={handleRechazar}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                  >
                    Rechazar
                  </button>
                </div>
              )}

              {/* Confirmación de Aprobación */}
              {mostrarConfirmacion && solicitudSeleccionada && (
                <div className="mt-6 bg-green-50 border-2 border-[#39A900] rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    ¿Confirmar aprobación?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Estás a punto de aprobar la solicitud {solicitudSeleccionada.codigo}. 
                    Esta acción no se puede deshacer.
                  </p>
                  <div className="flex gap-4 justify-end">
                    <button
                      onClick={() => setMostrarConfirmacion(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={confirmarAprobacion}
                      className="bg-[#39A900] hover:bg-[#007832] text-white font-bold px-6 py-2 rounded-lg transition-colors"
                    >
                      Sí, Aprobar
                    </button>
                  </div>
                </div>
              )}

              {/* Formulario de Rechazo */}
              {mostrarRechazo && solicitudSeleccionada && (
                <div className="mt-6 bg-red-50 border-2 border-red-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Motivo del rechazo
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Por favor, indica el motivo por el cual se rechaza la solicitud {solicitudSeleccionada.codigo}:
                  </p>
                  <textarea
                    value={motivoRechazo}
                    onChange={(e) => setMotivoRechazo(e.target.value)}
                    placeholder="Escribe el motivo del rechazo..."
                    className="w-full border-2 border-gray-300 rounded-lg p-3 mb-4 focus:border-red-600 focus:outline-none min-h-[100px]"
                  />
                  <div className="flex gap-4 justify-end">
                    <button
                      onClick={() => {
                        setMostrarRechazo(false);
                        setMotivoRechazo('');
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={confirmarRechazo}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg transition-colors"
                    >
                      Confirmar Rechazo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
