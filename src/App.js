import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import RequestForm from './components/fomulario';
import SolicitudesTable from './components/SolicitudesTable';
import Login from './components/Login';
import Register from './components/Register';


const dummyPendingRequests = [
  { 
    id: 'SOL-021', 
    cuentadantes: ['Ana Pérez'],
    solicitante: 'Ana Pérez',
    numBienes: 1,
    fechaSalida: '2025-10-17', 
    fechaRegreso: '2025-10-18',
    estadoGeneral: 'Rechazado',
    uso: 'Presentaciones y clases magistrales',
    destino: 'Auditorio Principal - Bloque A',
    objetos: [
      {
        nombre: 'Proyector',
        marca: 'Epson',
        modelo: 'PowerLite X49',
        placa: 'PROJ-2023-045'
      }
    ]
  },
  { 
    id: 'SOL-022', 
    cuentadantes: ['Luis Gómez', 'María Torres'],
    solicitante: 'Luis Gómez',
    numBienes: 2,
    fechaSalida: '2025-10-18', 
    fechaRegreso: '2025-10-20',
    estadoGeneral: 'Rechazado',
    uso: 'Trabajo de oficina y desarrollo',
    destino: 'Oficina 302 - Bloque B',
    objetos: [
      {
        nombre: 'Portátil',
        marca: 'Dell',
        modelo: '540',
        placa: '11199997'
      },
      {
        nombre: 'Mouse Inalámbrico',
        marca: 'Logitech',
        modelo: 'M185',
        placa: 'MOUSE-2024-089'
      }
    ]
  },
  { 
    id: 'SOL-023', 
    cuentadantes: ['Carlos Rodríguez'],
    solicitante: 'Carlos Rodríguez',
    numBienes: 1,
    fechaSalida: '2025-10-20', 
    fechaRegreso: '2025-10-22',
    estadoGeneral: 'Rechazado',
    uso: 'Sesión fotográfica evento institucional',
    destino: 'Patio Central',
    objetos: [
      {
        nombre: 'Cámara',
        marca: 'Canon',
        modelo: 'EOS Rebel T7',
        placa: 'CAM-2024-089'
      }
    ]
  },
  { 
    id: 'SOL-024', 
    cuentadantes: ['Sofía Herrera', 'Luis Fernández', 'María Gómez'],
    solicitante: 'Sofía Herrera',
    numBienes: 3,
    fechaSalida: '2025-10-23', 
    fechaRegreso: '2025-10-25',
    estadoGeneral: 'Aprobación parcial',
    uso: 'Desarrollo de software y capacitación',
    destino: 'Laboratorio de Sistemas - Bloque C',
    objetos: [
      {
        nombre: 'Laptop',
        marca: 'HP',
        modelo: 'ProBook 450',
        placa: 'LAP-2024-156'
      },
      {
        nombre: 'Laptop',
        marca: 'Dell',
        modelo: 'Latitude 5420',
        placa: 'LAP-2024-157'
      },
      {
        nombre: 'Proyector',
        marca: 'Epson',
        modelo: 'EB-X05',
        placa: 'PROJ-2024-033'
      }
    ]
  },
  { 
    id: 'SOL-025', 
    cuentadantes: ['Carlos Rodríguez'],
    solicitante: 'Carlos Rodríguez',
    numBienes: 1,
    fechaSalida: '2025-10-24', 
    fechaRegreso: '2025-10-26',
    estadoGeneral: 'Pendiente',
    uso: 'Presentaciones móviles',
    destino: 'Sala de Reuniones 201',
    objetos: [
      {
        nombre: 'Tablet',
        marca: 'Samsung',
        modelo: 'Galaxy Tab S7',
        placa: 'TAB-2024-201'
      }
    ]
  },
];

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

const AppStyles = `
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background-color: ${SENA_COLORS.lightGreen};
    color: ${SENA_COLORS.darkText};
    display: flex;
    min-height: 100vh;
  }
  .main-content { 
    margin-left: 250px; 
    padding: 2rem; 
    flex-grow: 1; 
  }
  .dashboard-container { 
    max-width: 1200px; 
    margin: auto; 
  }
  .card {
    background: #fff; 
    border-radius: 12px; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    padding: 2rem; 
    border-top: 5px solid ${SENA_COLORS.green};
  }
  .card-header {
    border-bottom: 2px solid ${SENA_COLORS.yellow}; 
    margin-bottom: 1rem; 
    padding-bottom: 0.5rem;
  }
  .card-header h2 { 
    margin: 0; 
    color: ${SENA_COLORS.green}; 
  }
  .status-badge {
    padding: 4px 8px; 
    border-radius: 4px; 
    font-weight: 500; 
    font-size: 0.9rem;
    display: inline-block;
  }
  .status-badge.Aprobado { background: ${SENA_COLORS.approved}; color: #fff; }
  .status-badge.Pendiente { background: ${SENA_COLORS.pending}; color: ${SENA_COLORS.darkText}; }
  .status-badge.Rechazado { background: ${SENA_COLORS.rejected}; color: #fff; }

  /* Table Styles for Historial */
  .data-table { 
    width: 100%; 
    border-collapse: collapse; 
  }
  .data-table th, .data-table td {
    padding: 12px 15px; 
    border-bottom: 1px solid #ddd; 
    text-align: left;
  }
  .data-table th {
    background: ${SENA_COLORS.lightGreen}; 
    color: ${SENA_COLORS.green}; 
    text-transform: uppercase;
  }
  .data-table tbody tr:nth-child(even) { background: ${SENA_COLORS.gray}; }
  .data-table tbody tr:hover { background: #f2fff2; }
`;

// ==============================================================================
// Componente Historial (extraído para mantener App.jsx limpio)
// ==============================================================================

const Historial = ({ historial }) => {
  return (
    <div className="dashboard-container">
      <div className="card">
        <div className="card-header">
          <h2>Historial de Solicitudes</h2>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha Solicitud</th>
              <th>Solicitante</th>
              <th>Bienes</th>
              <th>Acción</th>
              <th>Comentario</th>
              <th>Fecha Acción</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((req, index) => (
              <tr key={index}>
                <td>{req.id}</td>
                <td>{req.fecha}</td>
                <td>{req.solicitante}</td>
                <td>{req.bienes}</td>
                <td>
                  <span className={`status-badge ${req.accion}`}>{req.accion}</span>
                </td>
                <td>{req.comentario || 'N/A'}</td>
                <td>{req.fechaAccion}</td>
              </tr>
            ))}
            {/* Registros Estáticos del Historial para coincidir con tu HTML original */}
            <tr>
              <td>#2022999</td>
              <td>2023-10-20</td>
              <td>Carlos López</td>
              <td>1 Cámara, 2 Micrófonos</td>
              <td><span className="status-badge Aprobado">Aprobado</span></td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>#2022998</td>
              <td>2023-10-18</td>
              <td>María Pérez</td>
              <td>5 Sillas</td>
              <td><span className="status-badge Rechazado">Rechazado</span></td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
             <tr>
              <td>#2022997</td>
              <td>2023-10-15</td>
              <td>José Martínez</td>
              <td>1 Laptop</td>
              <td><span className="status-badge Pendiente">Pendiente</span></td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


// ==============================================================================
// Componente Principal App
// ==============================================================================

function App() {
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('login'); // 'login' o 'register'
  const [activeView, setActiveView] = useState('pendientes'); // 'pendientes' o 'historial'
  const [pendingRequests, setPendingRequests] = useState(dummyPendingRequests);
  const [historial, setHistorial] = useState(() => {
    try {
      // Intentar cargar historial del localStorage
      const saved = localStorage.getItem('historialSolicitudes');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading historial from localStorage", error);
      return [];
    }
  });

  // Verificar si hay usuario guardado al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('senaUser') || sessionStorage.getItem('senaUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error loading user", error);
      }
    }
  }, []);

  // Efecto para guardar el historial cada vez que cambie
  useEffect(() => {
    localStorage.setItem('historialSolicitudes', JSON.stringify(historial));
  }, [historial]);

  // Función para manejar la acción (Aprobar/Rechazar) y mover a historial
  const handleAction = (request, accion, comentario = null) => {
    const newRecord = {
      ...request,
      accion: accion,
      comentario: comentario,
      fechaAccion: new Date().toLocaleString(),
    };
    
    // 1. Añadir al historial
    setHistorial(prevHistorial => [newRecord, ...prevHistorial]);

    // 2. Remover de las solicitudes pendientes (simulación de backend)
    setPendingRequests(prevRequests => 
      prevRequests.filter(req => req.id !== request.id)
    );
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    // El registro ya guarda el usuario, solo necesitamos actualizar el estado
    console.log('Usuario registrado:', userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('senaUser');
    sessionStorage.removeItem('senaUser');
    setActiveView('pendientes');
  };

  // Si no hay usuario, mostrar login o registro
  if (!user) {
    return authView === 'login' ? (
      <Login 
        onLogin={handleLogin} 
        onSwitchToRegister={() => setAuthView('register')} 
      />
    ) : (
      <Register 
        onRegister={handleRegister} 
        onSwitchToLogin={() => setAuthView('login')} 
      />
    );
  }

  // Usuario autenticado, mostrar dashboard
  return (
    <>
      <style>{AppStyles}</style>
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        user={user}
        onLogout={handleLogout}
      />
      <div className="main-content">
        {activeView === 'pendientes' ? (
          <SolicitudesTable 
            requests={pendingRequests} 
            handleAction={handleAction} 
          />
        ) : activeView === 'Formulario' ? (
          <RequestForm />
        ) : (
          <Historial historial={historial} />
        )}
        
      </div>
    </>
  );
}

export default App;
