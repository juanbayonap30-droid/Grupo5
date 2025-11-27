# Cambios: Página de Gestión de Solicitudes

## Resumen
Se agregó la página de "Gestión de Solicitudes" para el rol de Administrador, con una tabla que muestra las solicitudes pendientes de revisión.

## Archivos Creados

### 1. `app/dashboard/admin/solicitudes/page.js`
- Página principal de gestión de solicitudes
- Muestra tabla con datos de prueba
- Columnas: Código, Cuentadantes, N° Bienes, Fecha Salida, Fecha Regreso, Acciones
- Botón "Ver Detalle" para cada solicitud
- Diseño responsive con colores SENA (verde)

## Archivos Modificados

### 1. `app/dashboard/page.js`
- Agregado `onClick` al ActionCard "Revisar Solicitudes" del DashboardAdministrador
- Redirige a `/dashboard/admin/solicitudes`

### 2. `app/components/Sidebar.js`
- Agregada opción "Revisar Solicitudes" en el menú del administrador
- Icono: 📝
- Ruta: `/dashboard/admin/solicitudes`

## Cómo Probar

1. Iniciar sesión como administrador:
   - Email: `admin@sena.edu.co`
   - Password: `admin123`

2. Desde el dashboard, hacer clic en:
   - Tarjeta "Revisar Solicitudes", O
   - Opción del sidebar "Revisar Solicitudes"

3. Se mostrará la tabla con 5 solicitudes de prueba

## Datos de Prueba

La página muestra 5 solicitudes de ejemplo:
- SOL-021: Ana Pérez (1 bien)
- SOL-022: Luis Gómez, María Torres (2 bienes)
- SOL-023: Carlos Rodríguez (1 bien)
- SOL-024: Sofía Herrera, Luis Fernández, María Gómez (3 bienes)
- SOL-025: Carlos Rodríguez (1 bien)

## Funcionalidades Implementadas

### Modal de Detalles
- ✅ Se abre al hacer clic en "Ver Detalle"
- ✅ Muestra tabla de bienes solicitados (Objeto, Marca, Modelo, Placa)
- ✅ Muestra información adicional:
  - Uso o motivo
  - Destino
  - Nombre del solicitante
  - Fechas de salida y regreso
- ✅ Botones de Aprobar y Rechazar

### Flujo de Aprobación
1. Usuario hace clic en "Aprobar"
2. Se muestra confirmación: "¿Confirmar aprobación?"
3. Usuario puede cancelar o confirmar
4. Al confirmar, se muestra mensaje de éxito

### Flujo de Rechazo
1. Usuario hace clic en "Rechazar"
2. Se muestra formulario para indicar motivo
3. Campo de texto obligatorio para el motivo
4. Usuario puede cancelar o confirmar rechazo
5. Al confirmar, se valida que haya motivo y se procesa

## Próximos Pasos

- [ ] Conectar con API real de solicitudes
- [ ] Agregar filtros y búsqueda
- [ ] Implementar paginación
- [ ] Guardar aprobaciones/rechazos en base de datos
- [ ] Enviar notificaciones al solicitante
