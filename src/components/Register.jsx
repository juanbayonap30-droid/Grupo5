import React, { useState } from 'react';

const SENA_COLORS = {
  green: '#39A900',
  yellow: '#FFC000',
  lightGreen: '#E0F4E8',
  darkText: '#333',
  lightText: '#fff',
  gray: '#f4f4f4',
};

const RegisterStyles = `
  .auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, ${SENA_COLORS.lightGreen} 0%, #ffffff 100%);
    padding: 2rem;
  }
  .auth-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    padding: 3rem;
    max-width: 500px;
    width: 100%;
    border-top: 6px solid ${SENA_COLORS.green};
  }
  .auth-logo {
    text-align: center;
    margin-bottom: 2rem;
  }
  .auth-logo h1 {
    color: ${SENA_COLORS.green};
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
    font-weight: 700;
  }
  .auth-logo p {
    color: ${SENA_COLORS.darkText};
    margin: 0;
    font-size: 1rem;
  }
  .auth-divider {
    height: 3px;
    background: ${SENA_COLORS.yellow};
    margin: 1.5rem 0;
    border-radius: 2px;
  }
  .auth-form-group {
    margin-bottom: 1.5rem;
  }
  .auth-label {
    display: block;
    font-weight: 500;
    color: ${SENA_COLORS.darkText};
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }
  .auth-input {
    width: 100%;
    padding: 0.9rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s;
    box-sizing: border-box;
  }
  .auth-input:focus {
    outline: none;
    border-color: ${SENA_COLORS.green};
    box-shadow: 0 0 0 3px rgba(57, 169, 0, 0.1);
  }
  .auth-error {
    color: #d62828;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
  .auth-btn {
    width: 100%;
    padding: 1rem;
    background: ${SENA_COLORS.green};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 1rem;
  }
  .auth-btn:hover {
    background: #2d7a00;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(57, 169, 0, 0.3);
  }
  .auth-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
  .auth-link {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.95rem;
  }
  .auth-link a {
    color: ${SENA_COLORS.green};
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
  }
  .auth-link a:hover {
    text-decoration: underline;
  }
  .auth-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .auth-success {
    background: #2a9d8f;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export default function Register({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'El departamento es requerido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Simular llamada al backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aquí iría la lógica real de registro
      const user = {
        name: formData.name,
        email: formData.email,
        department: formData.department,
      };
      
      setSuccess(true);
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        onRegister(user);
        onSwitchToLogin();
      }, 2000);
      
    } catch (error) {
      setErrors({ general: 'Error al registrar usuario. Intenta nuevamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{RegisterStyles}</style>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <h1>SENA</h1>
            <p>Crear Nueva Cuenta</p>
          </div>
          <div className="auth-divider"></div>

          {success && (
            <div className="auth-success">
              <strong>¡Registro exitoso! ✅</strong>
              <p>Redirigiendo al inicio de sesión...</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label className="auth-label">Nombre Completo</label>
              <input
                type="text"
                className="auth-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Juan Pérez"
              />
              {errors.name && <p className="auth-error">{errors.name}</p>}
            </div>

            <div className="auth-grid">
              <div className="auth-form-group">
                <label className="auth-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="auth-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="usuario@sena.edu.co"
                />
                {errors.email && <p className="auth-error">{errors.email}</p>}
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Departamento</label>
                <input
                  type="text"
                  className="auth-input"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Sistemas, Almacén..."
                />
                {errors.department && <p className="auth-error">{errors.department}</p>}
              </div>
            </div>

            <div className="auth-grid">
              <div className="auth-form-group">
                <label className="auth-label">Contraseña</label>
                <input
                  type="password"
                  className="auth-input"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                />
                {errors.password && <p className="auth-error">{errors.password}</p>}
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  className="auth-input"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword}</p>}
              </div>
            </div>

            {errors.general && <p className="auth-error" style={{ textAlign: 'center' }}>{errors.general}</p>}

            <button type="submit" className="auth-btn" disabled={isLoading || success}>
              {isLoading ? 'Registrando...' : success ? 'Registro Exitoso' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="auth-link">
            ¿Ya tienes cuenta? <a onClick={onSwitchToLogin}>Inicia sesión aquí</a>
          </div>
        </div>
      </div>
    </>
  );
}
