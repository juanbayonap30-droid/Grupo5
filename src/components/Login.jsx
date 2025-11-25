import React, { useState } from 'react';

const SENA_COLORS = {
  green: '#39A900',
  yellow: '#FFC000',
  lightGreen: '#E0F4E8',
  darkText: '#333',
  lightText: '#fff',
  gray: '#f4f4f4',
};

const LoginStyles = `
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
    max-width: 450px;
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
  .auth-checkbox-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
  }
  .auth-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

export default function Login({ onLogin, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí iría la lógica real de autenticación
      const user = {
        email: formData.email,
        name: 'Usuario SENA',
      };
      
      if (formData.rememberMe) {
        localStorage.setItem('senaUser', JSON.stringify(user));
      } else {
        sessionStorage.setItem('senaUser', JSON.stringify(user));
      }
      
      onLogin(user);
    } catch (error) {
      setErrors({ general: 'Error al iniciar sesión. Intenta nuevamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{LoginStyles}</style>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <h1>SENA</h1>
            <p>Sistema de Gestión</p>
          </div>
          <div className="auth-divider"></div>

          <form onSubmit={handleSubmit}>
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

            <div className="auth-checkbox-group">
              <input
                type="checkbox"
                className="auth-checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              <label htmlFor="rememberMe" style={{ cursor: 'pointer' }}>Recordarme</label>
            </div>

            {errors.general && <p className="auth-error" style={{ textAlign: 'center' }}>{errors.general}</p>}

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="auth-link">
            ¿No tienes cuenta? <a onClick={onSwitchToRegister}>Regístrate aquí</a>
          </div>
        </div>
      </div>
    </>
  );
}
