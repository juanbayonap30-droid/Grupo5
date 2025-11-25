import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SidebarStyles = `
  .sidebar {
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #39A900;
    color: #fff;
    padding: 1rem;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .sidebar-header { text-align: center; margin-bottom: 1rem; }
  .sidebar-header h2 { margin: 0; font-size: 1.5rem; color: #fff; }
  .sidebar-header h3 { margin: 0; font-size: 1rem; font-weight: 400; color: rgba(255,255,255,0.8); }

  .sidebar-menu { flex-grow: 1; }
  .sidebar-menu a {
    padding: 12px 20px; text-decoration: none; display: block;
    font-size: 1.1rem; color: #fff;
    transition: background 0.3s;
    border-radius: 5px;
    margin-bottom: 5px;
  }
  .sidebar-menu a.active {
    background: #E0F4E8;
    color: #39A900;
    font-weight: 700;
  }
  .sidebar-menu a:hover:not(.active) { 
    background: rgba(255,255,255,0.2); 
  }

  .sidebar-footer { border-top: 1px solid rgba(255,255,255,0.3); padding-top: 1rem; }
  .logout-button {
    width: 100%; padding: 10px; background: rgba(255,255,255,0.1);
    color: #fff; border: none; border-radius: 5px; cursor: pointer;
  }
  .logout-button:hover { background: rgba(255,255,255,0.2); }
`;

const Sidebar = ({ activeView, setActiveView, user, onLogout }) => {
  return (
    <>
      <style>{SidebarStyles}</style>
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Administración SENA</h2>
          <h3>Gestión</h3>
          {user && (
            <p style={{ 
              fontSize: '0.85rem', 
              marginTop: '0.5rem', 
              opacity: 0.9,
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: '0.5rem'
            }}>
              <i className="fas fa-user"></i> {user.name}
            </p>
          )}
        </div>
        <div className="sidebar-menu">
          <a 
            href="#" 
            className={activeView === 'pendientes' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveView('pendientes'); }}
          >
            <i className="fas fa-list-ul"></i> Solicitudes Pendientes
          </a>
          <a 
            href="#" 
            className={activeView === 'historial' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveView('historial'); }}
          >
            <i className="fas fa-history"></i> Historial
          </a>
          <a 
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <i className="fas fa-search"></i> Inventario
          </a>
          <a 
            href="#" 
            className={activeView === 'Formulario' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveView('Formulario'); }}
          >
            <i className="fas fa-file-alt"></i> Formulario
          </a>
        </div>
        <div className="sidebar-footer">
          <button 
            className="logout-button"
            onClick={onLogout}
          >
            <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;