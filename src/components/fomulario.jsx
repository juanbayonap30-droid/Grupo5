import React, { useState, useEffect } from 'react';

const SENA_COLORS = {
  green: '#39A900',
  yellow: '#FFC000',
  lightGreen: '#E0F4E8',
  darkText: '#333',
  lightText: '#fff',
  approved: '#2a9d8f',
  pending: '#e9c46a',
  rejected: '#d62828',
  gray: '#f4f4f4',
};

const FormStyles = `
  .form-container {
    max-width: 1200px;
    margin: auto;
  }
  .form-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    padding: 2rem;
    border-top: 5px solid ${SENA_COLORS.green};
  }
  .form-header {
    border-bottom: 2px solid ${SENA_COLORS.yellow};
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;
  }
  .form-header h2 {
    margin: 0;
    color: ${SENA_COLORS.green};
    font-size: 1.8rem;
    font-weight: 600;
  }
  .form-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: ${SENA_COLORS.lightGreen};
    border-radius: 8px;
    border-left: 4px solid ${SENA_COLORS.green};
  }
  .form-section h3 {
    color: ${SENA_COLORS.green};
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  .form-grid-full {
    grid-column: 1 / -1;
  }
  .form-group {
    display: flex;
    flex-direction: column;
  }
  .form-label {
    font-weight: 500;
    color: ${SENA_COLORS.darkText};
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  .form-input, .form-select {
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  .form-input:focus, .form-select:focus {
    outline: none;
    border-color: ${SENA_COLORS.green};
    box-shadow: 0 0 0 3px rgba(57, 169, 0, 0.1);
  }
  .form-error {
    color: ${SENA_COLORS.rejected};
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1rem;
  }
  .btn-primary {
    background: ${SENA_COLORS.green};
    color: white;
  }
  .btn-primary:hover {
    background: #2d7a00;
    transform: translateY(-1px);
  }
  .btn-secondary {
    background: ${SENA_COLORS.yellow};
    color: ${SENA_COLORS.darkText};
  }
  .btn-secondary:hover {
    background: #e6ac00;
  }
  .btn-danger {
    background: ${SENA_COLORS.rejected};
    color: white;
  }
  .btn-danger:hover {
    background: #b91c1c;
  }
  .btn-outline {
    background: transparent;
    border: 2px solid ${SENA_COLORS.green};
    color: ${SENA_COLORS.green};
  }
  .btn-outline:hover {
    background: ${SENA_COLORS.green};
    color: white;
  }
  .items-list {
    background: white;
    border-radius: 8px;
    padding: 1rem;
  }
  .item-card {
    background: ${SENA_COLORS.gray};
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .item-info h4 {
    margin: 0 0 0.5rem 0;
    color: ${SENA_COLORS.green};
    font-weight: 600;
  }
  .item-info p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: ${SENA_COLORS.darkText};
  }
  .item-actions {
    display: flex;
    gap: 0.5rem;
  }
  .btn-small {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  .success-message {
    background: ${SENA_COLORS.approved};
    color: white;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    text-align: center;
  }
  .form-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
    font-size: 0.9rem;
    color: #666;
  }
  .button-group {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export default function RequestForm() {
  const [requester, setRequester] = useState({ name: '', email: '', department: '' });
  const [item, setItem] = useState({ name: '', qty: 1, priority: 'Normal', note: '' });
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // ejemplo: cargar borrador desde localStorage
    const draft = localStorage.getItem('requestDraft');
    if (draft) {
      const parsed = JSON.parse(draft);
      setRequester(parsed.requester || { name: '', email: '', department: '' });
      setItems(parsed.items || []);
    }
  }, []);

  useEffect(() => {
    // guardar borrador automáticamente
    const draft = { requester, items };
    localStorage.setItem('requestDraft', JSON.stringify(draft));
  }, [requester, items]);

  function validateRequester() {
    const e = {};
    if (!requester.name.trim()) e.name = 'El nombre es requerido.';
    if (!requester.email.trim()) e.email = 'El correo es requerido.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(requester.email)) e.email = 'Correo inválido.';
    return e;
  }

  function validateItem(i) {
    const e = {};
    if (!i.name.trim()) e.name = 'Nombre del objeto requerido.';
    if (!Number.isInteger(Number(i.qty)) || Number(i.qty) < 1) e.qty = 'Cantidad debe ser 1 o más.';
    return e;
  }

  function handleAddOrUpdateItem(e) {
    e.preventDefault();
    const ve = validateItem(item);
    if (Object.keys(ve).length) {
      setErrors(ve);
      return;
    }
    setErrors({});
    if (editingIndex !== null) {
      const copy = [...items];
      copy[editingIndex] = { ...item };
      setItems(copy);
      setEditingIndex(null);
    } else {
      setItems(prev => [...prev, { ...item }]);
    }
    setItem({ name: '', qty: 1, priority: 'Normal', note: '' });
  }

  function handleEditItem(index) {
    setEditingIndex(index);
    setItem(items[index]);
  }

  function handleDeleteItem(index) {
    setItems(prev => prev.filter((_, i) => i !== index));
    // si está editando ese elemento, cancelar edición
    if (editingIndex === index) {
      setEditingIndex(null);
      setItem({ name: '', qty: 1, priority: 'Normal', note: '' });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const re = validateRequester();
    if (Object.keys(re).length) {
      setErrors(re);
      return;
    }
    if (items.length === 0) {
      setErrors({ general: 'Agrega al menos un objeto a la solicitud.' });
      return;
    }

    setErrors({});

    const payload = {
      requester,
      items,
      requestedAt: new Date().toISOString(),
    };

    try {
      // Ejemplo: enviar al backend. Ajusta la URL a tu API.
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Error al enviar la solicitud.');

      // limpieza local y confirmación
      localStorage.removeItem('requestDraft');
      setRequester({ name: '', email: '', department: '' });
      setItems([]);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3500);
    } catch (err) {
      setErrors({ general: err.message || 'Fallo del servidor.' });
    }
  }

  return (
    <>
      <style>{FormStyles}</style>
      <div className="form-container">
        <div className="form-card">
          <div className="form-header">
            <h2>Formulario de Solicitud de Objetos</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Información del Solicitante</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nombre Completo</label>
                  <input
                    className="form-input"
                    value={requester.name}
                    onChange={e => setRequester({ ...requester, name: e.target.value })}
                    placeholder="Juan Pérez"
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Correo Electrónico</label>
                  <input
                    className="form-input"
                    type="email"
                    value={requester.email}
                    onChange={e => setRequester({ ...requester, email: e.target.value })}
                    placeholder="juan@ejemplo.com"
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Departamento / Área</label>
                  <input
                    className="form-input"
                    value={requester.department}
                    onChange={e => setRequester({ ...requester, department: e.target.value })}
                    placeholder="Almacén, Compras, Sistemas..."
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Agregar Objeto a la Solicitud</h3>
              <div className="form-grid">
                <div className="form-group form-grid-full">
                  <label className="form-label">Nombre del Objeto</label>
                  <input
                    className="form-input"
                    value={item.name}
                    onChange={e => setItem({ ...item, name: e.target.value })}
                    placeholder="Ej: Proyector, Computador, Sillas..."
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Cantidad</label>
                  <input
                    className="form-input"
                    type="number"
                    value={item.qty}
                    onChange={e => setItem({ ...item, qty: Number(e.target.value) })}
                    min={1}
                  />
                  {errors.qty && <p className="form-error">{errors.qty}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Prioridad</label>
                  <select
                    className="form-select"
                    value={item.priority}
                    onChange={e => setItem({ ...item, priority: e.target.value })}
                  >
                    <option value="Baja">Baja</option>
                    <option value="Normal">Normal</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>

                <div className="form-group form-grid-full">
                  <label className="form-label">Nota Adicional (Opcional)</label>
                  <input
                    className="form-input"
                    value={item.note}
                    onChange={e => setItem({ ...item, note: e.target.value })}
                    placeholder="Ej: Color preferido, modelo específico, características especiales..."
                  />
                </div>

                <div className="form-group form-grid-full">
                  <div className="button-group">
                    <button
                      type="button"
                      onClick={handleAddOrUpdateItem}
                      className="btn btn-primary"
                    >
                      {editingIndex !== null ? 'Actualizar Objeto' : 'Agregar Objeto'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setItem({ name: '', qty: 1, priority: 'Normal', note: '' });
                        setEditingIndex(null);
                        setErrors({});
                      }}
                      className="btn btn-outline"
                    >
                      Limpiar Campos
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Lista de Objetos Solicitados</h3>
              <div className="items-list">
                {items.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                    No hay objetos añadidos a la solicitud.
                  </p>
                ) : (
                  items.map((it, idx) => (
                    <div key={idx} className="item-card">
                      <div className="item-info">
                        <h4>{it.name} <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>x{it.qty}</span></h4>
                        <p><strong>Prioridad:</strong> {it.priority}</p>
                        {it.note && <p><strong>Nota:</strong> {it.note}</p>}
                      </div>
                      <div className="item-actions">
                        <button 
                          type="button"
                          onClick={() => handleEditItem(idx)} 
                          className="btn btn-secondary btn-small"
                        >
                          Editar
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDeleteItem(idx)} 
                          className="btn btn-danger btn-small"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {errors.general && <p className="form-error" style={{ textAlign: 'center', fontSize: '1rem' }}>{errors.general}</p>}

            {submitted && (
              <div className="success-message">
                <strong>¡Solicitud enviada exitosamente! ✅</strong>
                <p>Tu solicitud ha sido registrada y será procesada por el equipo correspondiente.</p>
              </div>
            )}

            <div className="button-group" style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                Enviar Solicitud
              </button>
              <button
                type="button"
                onClick={() => {
                  setRequester({ name: '', email: '', department: '' });
                  setItems([]);
                  setItem({ name: '', qty: 1, priority: 'Normal', note: '' });
                  setErrors({});
                  localStorage.removeItem('requestDraft');
                }}
                className="btn btn-outline"
              >
                Borrar Todo
              </button>
            </div>
          </form>

          <div className="form-footer">
            <p><strong>Nota:</strong> Tu solicitud se guarda automáticamente mientras escribes. Una vez enviada, será revisada por el equipo de administración y recibirás una respuesta por correo electrónico.</p>
          </div>
        </div>
      </div>
    </>
  );
}