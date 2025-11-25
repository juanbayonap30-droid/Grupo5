import React, { useState, useCallback } from 'react';

const TableStyles = `
  .button {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    margin-right: 5px;
    transition: background 0.2s;
  }
  .approve {
    background: #39A900;
    color: white;
  }
  .approve:hover { background: #2E7D00; }
  .reject {
    background: #e53935;
    color: white;
  }
  .reject:hover { background: #b71c1c; }

  /* Modal Styles */
  .modal {
    display: none; 
    position: fixed; 
    z-index: 2000; 
    padding-top: 100px; 
    left: 0; 
    top: 0; 
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgba(0,0,0,0.4); 
  }
  .modal.active {
    display: block;
  }
  .modal-content {
    background-color: #fff;
    margin: auto;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  .modal-header {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #39A900;
  }
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;
  }
  .close {
    float: right;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    line-height: 1;
  }
  textarea {
    width: 100%;
    min-height: 80px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 6px;
    resize: vertical;
    font-family: 'Roboto', sans-serif;
  }

  /* Table base styles */
  .request-table { 
    width: 100%; 
    border-collapse: collapse;
    background: white;
  }
  .request-table th, .request-table td {
    padding: 15px 12px;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
    vertical-align: middle;
  }
  .request-table th {
    background: #39A900;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .request-table tbody tr {
    transition: background 0.2s;
  }
  .request-table tbody tr:hover {
    background: #f8f8f8;
  }
  .clickable-id {
    color: #333;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s;
  }
  .clickable-id:hover {
    color: #39A900;
  }
  .cuentadante-item {
    display: block;
    font-size: 0.9rem;
    color: #555;
    line-height: 1.6;
  }
  .status-badge-table {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    display: inline-block;
  }
  .status-rechazado {
    background: #ffebee;
    color: #c62828;
  }
  .status-aprobacion-parcial {
    background: #e3f2fd;
    color: #1565c0;
  }
  .status-pendiente {
    background: #fff9c4;
    color: #f57f17;
  }
  .btn-ver-detalle {
    background: #2196F3;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    transition: background 0.2s;
  }
  .btn-ver-detalle:hover {
    background: #1976D2;
  }
  .detail-modal-content {
    background-color: #fff;
    margin: auto;
    padding: 0;
    border-radius: 10px;
    width: 90%;
    max-width: 650px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    overflow: hidden;
  }
  .objetos-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  .objetos-table th {
    background: #39A900;
    color: white;
    padding: 0.7rem;
    text-align: left;
    font-size: 0.85rem;
    font-weight: 600;
  }
  .objetos-table td {
    padding: 0.7rem;
    border-bottom: 1px solid #e0e0e0;
    font-size: 0.85rem;
    color: #555;
  }
  .objetos-table tbody tr:hover {
    background: #f8f8f8;
  }
  .detalles-container {
    margin: 1.5rem 0;
    padding: 1.2rem;
    background: #f9f9f9;
    border-radius: 8px;
    border-left: 4px solid #39A900;
  }
  .detalle-item {
    margin-bottom: 1rem;
  }
  .detalle-item:last-child {
    margin-bottom: 0;
  }
  .detalle-label {
    font-size: 0.75rem;
    color: #666;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
    letter-spacing: 0.5px;
  }
  .detalle-value {
    font-size: 0.95rem;
    color: #333;
    font-weight: 400;
    line-height: 1.5;
  }
  .detail-header {
    font-size: 1.1rem;
    font-weight: bold;
    padding: 0.9rem 1.2rem;
    color: #39A900;
    border-bottom: 3px solid #FFC000;
    background: #fff;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    position: relative;
  }
  .detail-header .close {
    position: absolute;
    right: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.6rem;
    color: #666;
    cursor: pointer;
    line-height: 1;
    transition: color 0.2s;
  }
  .detail-header .close:hover {
    color: #333;
  }
  .detail-body {
    padding: 1rem;
  }
  .detail-section {
    margin: 0.8rem 0;
    padding: 0.9rem;
    background: #E0F4E8;
    border-radius: 6px;
    border-left: 4px solid #39A900;
  }
  .detail-section.yellow-section {
    background: #fff9e6;
    border-left: 4px solid #FFC000;
  }
  .detail-row {
    display: flex;
    margin: 0.5rem 0;
    padding: 0.4rem 0;
    align-items: center;
  }
  .detail-row:not(:last-child) {
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
  .detail-label {
    font-weight: 700;
    color: #333;
    min-width: 150px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
  }
  .detail-value {
    color: #666;
    flex: 1;
    font-size: 0.85rem;
  }
  .detail-icon {
    font-size: 1rem;
  }
`;

const SolicitudesTable = ({ requests, handleAction }) => {
  const [modalType, setModalType] = useState(null); // 'aprobar', 'rechazar', o 'detalle'
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectComment, setRejectComment] = useState('');

  const openModal = useCallback((type, request) => {
    setSelectedRequest(request);
    setModalType(type);
    setRejectComment(''); // Limpiar comentario al abrir
  }, []);

  const closeModal = useCallback(() => {
    setModalType(null);
    setSelectedRequest(null);
    setRejectComment('');
  }, []);

  const openDetailModal = useCallback((request) => {
    setSelectedRequest(request);
    setModalType('detalle');
  }, []);

  const handleConfirmApprove = () => {
    if (selectedRequest) {
      handleAction(selectedRequest, 'Aprobado');
      closeModal();
    }
  };

  const handleConfirmReject = () => {
    if (selectedRequest) {
      handleAction(selectedRequest, 'Rechazado', rejectComment);
      closeModal();
    }
  };

  return (
    <>
      <style>{TableStyles}</style>
      <h1>Gestión de Solicitudes</h1>
      <div className="card">
        <table className="request-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Cuentadantes</th>
              <th>N° Bienes</th>
              <th>Fecha Salida</th>
              <th>Fecha Regreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id}>
                <td>
                  <span 
                    className="clickable-id" 
                    onClick={() => openDetailModal(request)}
                    title="Ver detalles del objeto"
                  >
                    {request.id}
                  </span>
                </td>
                <td>
                  {request.cuentadantes.map((cuentadante, idx) => (
                    <span key={idx} className="cuentadante-item">
                      {cuentadante}
                    </span>
                  ))}
                </td>
                <td style={{ textAlign: 'center', fontWeight: '600' }}>{request.numBienes}</td>
                <td>{request.fechaSalida}</td>
                <td>{request.fechaRegreso}</td>
                <td>
                  <button 
                    className="btn-ver-detalle" 
                    onClick={() => openDetailModal(request)}
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', color: '#666', padding: '2rem'}}>
                  No hay solicitudes disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Aprobar */}
      <div id="modalAprobar" className={`modal ${modalType === 'aprobar' ? 'active' : ''}`} onClick={(e) => e.target.classList.contains('modal') && closeModal()}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <div className="modal-header">Confirmar Aprobación</div>
          {selectedRequest && (
            <p>
              <strong>ID:</strong> {selectedRequest.id}<br/>
              <strong>Fecha:</strong> {selectedRequest.fecha}<br/>
              <strong>Solicitante:</strong> {selectedRequest.solicitante}<br/>
              <strong>Bienes:</strong> {selectedRequest.bienes}<br/>
              <strong>Motivo:</strong> {selectedRequest.motivo}
            </p>
          )}
          <div className="modal-footer">
            <button className="button reject" onClick={closeModal}>Cancelar</button>
            <button className="button approve" onClick={handleConfirmApprove}>Confirmar</button>
          </div>
        </div>
      </div>

      {/* Modal Rechazar */}
      <div id="modalRechazar" className={`modal ${modalType === 'rechazar' ? 'active' : ''}`} onClick={(e) => e.target.classList.contains('modal') && closeModal()}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <div className="modal-header">Confirmar Rechazo</div>
          <p>Por favor ingresa un comentario del motivo de rechazo:</p>
          <textarea 
            id="comentarioRechazo" 
            placeholder="Escribe aquí..." 
            value={rejectComment} 
            onChange={(e) => setRejectComment(e.target.value)}
          />
          <div className="modal-footer">
            <button className="button approve" onClick={closeModal}>Cancelar</button>
            <button className="button reject" onClick={handleConfirmReject}>Rechazar</button>
          </div>
        </div>
      </div>

      {/* Modal Detalle de la Solicitud */}
      <div id="modalDetalle" className={`modal ${modalType === 'detalle' ? 'active' : ''}`} onClick={(e) => e.target.classList.contains('modal') && closeModal()}>
        <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="detail-header">
            � Detalles de la Solicitud: {selectedRequest?.id}
            <span className="close" onClick={closeModal}>&times;</span>
          </div>
          {selectedRequest && selectedRequest.objetos ? (
            <div className="detail-body">
              {/* Tabla de Objetos */}
              <table className="objetos-table">
                <thead>
                  <tr>
                    <th>Objeto</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Placa</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRequest.objetos.map((objeto, idx) => (
                    <tr key={idx}>
                      <td><strong>{objeto.nombre}</strong></td>
                      <td>{objeto.marca}</td>
                      <td>{objeto.modelo}</td>
                      <td style={{ fontFamily: 'monospace', fontWeight: '600' }}>{objeto.placa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Detalles de la Solicitud */}
              <div className="detalles-container">
                <div className="detalle-item">
                  <div className="detalle-label">Uso o Motivo</div>
                  <div className="detalle-value">{selectedRequest.uso}</div>
                </div>
                <div className="detalle-item">
                  <div className="detalle-label">Destino</div>
                  <div className="detalle-value">{selectedRequest.destino}</div>
                </div>
                <div className="detalle-item">
                  <div className="detalle-label">Nombre Solicitante</div>
                  <div className="detalle-value">{selectedRequest.solicitante}</div>
                </div>
                <div className="detalle-item">
                  <div className="detalle-label">Fecha Salida</div>
                  <div className="detalle-value">{selectedRequest.fechaSalida}</div>
                </div>
                <div className="detalle-item">
                  <div className="detalle-label">Fecha Regreso</div>
                  <div className="detalle-value">{selectedRequest.fechaRegreso}</div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="modal-footer" style={{ marginTop: '1.5rem' }}>
                <button 
                  className="button approve" 
                  onClick={() => {
                    closeModal();
                    openModal('aprobar', selectedRequest);
                  }}
                >
                  Aprobar
                </button>
                <button 
                  className="button reject" 
                  onClick={() => {
                    closeModal();
                    openModal('rechazar', selectedRequest);
                  }}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ) : (
            <div className="detail-body">
              <p style={{ textAlign: 'center', color: '#666', padding: '1.5rem', fontSize: '0.9rem' }}>
                No hay información detallada disponible para esta solicitud.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SolicitudesTable;