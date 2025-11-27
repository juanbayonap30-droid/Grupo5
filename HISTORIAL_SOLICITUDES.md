# Historial de Solicitudes

## Resumen
Se agregó la página de "Historial de Solicitudes" para el rol de Administrador, que muestra un registro completo de todas las solicitudes aprobadas y rechazadas.

## Archivos Creados

### 1. `app/dashboard/admin/historial/page.js`
Página principal del historial con las siguientes características:

#### Funcionalidades
- ✅ Tabla completa con todas las solicitudes procesadas
- ✅ Filtros por estado: Todas, Aprobadas, Rechazadas
- ✅ Columnas: ID, Fecha Solicitud, Solicitante, Bienes, Acción, Comentario, Fecha Acción
- ✅ Badges de colores según el estado:
  - Verde: Aprobado
  - Rojo: Rechazado
  - Naranja: Pendiente
- ✅ Filas alternadas con fondo verde claro para mejor legibilidad
- ✅ Estadísticas en la parte inferior:
  - Total de solicitudes
  - Total aprobadas
  - Total rechazadas

#### Datos de Prueba
La página incluye 9 solicitudes de ejemplo con diferentes estados y fechas.

## Archivos Modificados

### 1. `app/components/Sidebar.js`
- Agregada opción "Historial" en el menú del administrador
- Icono: 🔄
- Ruta: `/dashboard/admin/historial`
- Posición: Entre "Revisar Solicitudes" y "Usuarios"

## Cómo Acceder

1. Iniciar sesión como administrador:
   - Email: `admin@sena.edu.co`
   - Password: `admin123`

2. En el sidebar, hacer clic en "Historial"

3. Usar los filtros para ver:
   - Todas las solicitudes
   - Solo aprobadas
   - Solo rechazadas

## Diseño

- Colores SENA (verde) en headers y elementos principales
- Diseño responsive y moderno
- Tabla con hover effects
- Badges de estado con colores distintivos
- Estadísticas visuales en tarjetas

## Próximos Pasos

- [ ] Conectar con API real de historial
- [ ] Agregar búsqueda por solicitante o ID
- [ ] Implementar paginación
- [ ] Agregar exportación a PDF/Excel
- [ ] Agregar filtros por fecha
- [ ] Mostrar más detalles al hacer clic en una fila
