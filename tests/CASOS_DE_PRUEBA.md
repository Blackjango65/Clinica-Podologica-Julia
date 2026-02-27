# Casos de Prueba - Clínica Podológica Sobrino

## Descripción General
Plan de pruebas E2E con Playwright para la landing page de **Clínica Podológica Sobrino**.  
La web es una Single Page Application estática con las siguientes secciones: Hero, Partners, Servicios, Nosotros, Testimonios, CTA, Footer, Modal de Cita y Chatbot.

---

## Entornos de prueba

| Dispositivo | Viewport | Navegador |
|---|---|---|
| Desktop | 1280 × 720 | Chromium, Firefox, WebKit |
| Tablet | 768 × 1024 | Chromium |
| Móvil | 375 × 667 (iPhone SE) | Chromium, WebKit |

---

## CP-01: Carga inicial de la página

| Campo | Valor |
|---|---|
| **ID** | CP-01 |
| **Sección** | General |
| **Prioridad** | Alta |
| **Descripción** | Verificar que la página carga correctamente |
| **Precondiciones** | Servidor local corriendo |
| **Pasos** | 1. Navegar a la URL base |
| **Resultado esperado** | - Status HTTP 200<br>- Título: "Clínica Podológica Sobrino \| Cuida tus pasos, mejora tu vida"<br>- Meta description presente<br>- Body visible |

---

## CP-02: Meta tags y SEO básico

| Campo | Valor |
|---|---|
| **ID** | CP-02 |
| **Sección** | Head / SEO |
| **Prioridad** | Alta |
| **Descripción** | Comprobar meta tags esenciales |
| **Pasos** | 1. Navegar a la URL base<br>2. Inspeccionar `<head>` |
| **Resultado esperado** | - `<meta charset="UTF-8">` presente<br>- `<meta name="viewport">` presente<br>- `<meta name="description">` con contenido relevante<br>- `<meta name="google-site-verification">` presente |

---

## CP-03: Navbar - Elementos visibles (Desktop)

| Campo | Valor |
|---|---|
| **ID** | CP-03 |
| **Sección** | Navbar |
| **Prioridad** | Alta |
| **Descripción** | Verificar que la barra de navegación muestra todos los enlaces |
| **Pasos** | 1. Navegar a la URL base en desktop |
| **Resultado esperado** | - Logo "Podológica Sobrino" visible<br>- Enlaces: Inicio, Servicios, Nosotros, Opiniones visibles<br>- Botón "Cita Previa" visible |

---

## CP-04: Navbar - Efecto scroll

| Campo | Valor |
|---|---|
| **ID** | CP-04 |
| **Sección** | Navbar |
| **Prioridad** | Media |
| **Descripción** | Verificar que la navbar cambia de estilo al hacer scroll |
| **Pasos** | 1. Navegar a la URL base<br>2. Hacer scroll hacia abajo (> 50px) |
| **Resultado esperado** | - Navbar obtiene la clase `scrolled`<br>- Fondo con backdrop-filter visible |

---

## CP-05: Navbar - Navegación por secciones (Smooth Scroll)

| Campo | Valor |
|---|---|
| **ID** | CP-05 |
| **Sección** | Navbar |
| **Prioridad** | Alta |
| **Descripción** | Verificar que los enlaces desplazan a las secciones correspondientes |
| **Pasos** | 1. Click en "Servicios"<br>2. Click en "Nosotros"<br>3. Click en "Opiniones" |
| **Resultado esperado** | - Tras click en "Servicios", la sección `#servicios` es visible en viewport<br>- Tras click en "Nosotros", la sección `#sobre-nosotros` es visible<br>- Tras click en "Opiniones", la sección `#testimonios` es visible |

---

## CP-06: Menú Hamburguesa (Móvil)

| Campo | Valor |
|---|---|
| **ID** | CP-06 |
| **Sección** | Navbar - Mobile |
| **Prioridad** | Alta |
| **Descripción** | Verificar que el menú móvil funciona correctamente |
| **Precondiciones** | Viewport ≤ 768px |
| **Pasos** | 1. Navegar en viewport móvil<br>2. Pulsar botón hamburguesa<br>3. Verificar menú abierto<br>4. Pulsar de nuevo |
| **Resultado esperado** | - Botón hamburguesa visible<br>- Al pulsar, nav-links obtiene clase `mobile-active`<br>- Al pulsar de nuevo, clase se elimina |

---

## CP-07: Hero Section - Contenido

| Campo | Valor |
|---|---|
| **ID** | CP-07 |
| **Sección** | Hero |
| **Prioridad** | Alta |
| **Descripción** | Verificar que el hero muestra el contenido correcto |
| **Pasos** | 1. Navegar a la URL base |
| **Resultado esperado** | - Label "Especialistas en Salud del Pie" visible<br>- Título "Clínica Podológica Sobrino" visible<br>- Texto "Cuida tus pasos" visible<br>- Badge "Atención y servicios a domicilio disponibles" visible<br>- Botones "Reservar Cita Online" y "Ver Tratamientos" visibles |

---

## CP-08: Hero Section - Contadores animados

| Campo | Valor |
|---|---|
| **ID** | CP-08 |
| **Sección** | Hero - Stats |
| **Prioridad** | Media |
| **Descripción** | Verificar que los contadores se animan hasta su valor final |
| **Pasos** | 1. Navegar a la URL<br>2. Esperar a que la sección stats sea visible |
| **Resultado esperado** | - Contador "Años de Exp." llega a "5"<br>- Contador "Pacientes" llega a "5000"<br>- Contador "Calidad" llega a "100" |

---

## CP-09: Theme Switcher

| Campo | Valor |
|---|---|
| **ID** | CP-09 |
| **Sección** | Theme Switcher |
| **Prioridad** | Media |
| **Descripción** | Verificar que el cambio de tema funciona |
| **Pasos** | 1. Click en cada dot de color (verde, rojo, amarillo, violeta)<br>2. Verificar cambio CSS |
| **Resultado esperado** | - Al hacer click en cada dot, la variable CSS `--primary-500` cambia al color correspondiente<br>- El dot clickeado obtiene la clase `active`<br>- Los demás dots pierden la clase `active` |

---

## CP-10: Social Proof - Aseguradoras

| Campo | Valor |
|---|---|
| **ID** | CP-10 |
| **Sección** | Partners |
| **Prioridad** | Media |
| **Descripción** | Verificar que las aseguradoras y convenios se muestran |
| **Pasos** | 1. Scroll hasta la sección de partners |
| **Resultado esperado** | - Texto "Colaboramos con las mejores aseguradoras" visible<br>- 5 partners: Caser, Catalana Occidente, Divina Pastora, Nueva Mutua Sanitaria, Santalucía<br>- 3 convenios: MUGEJU, MUFACE, ISFAS |

---

## CP-11: Servicios - Tarjetas visibles

| Campo | Valor |
|---|---|
| **ID** | CP-11 |
| **Sección** | Servicios |
| **Prioridad** | Alta |
| **Descripción** | Verificar que las 7 tarjetas de servicios se muestran |
| **Pasos** | 1. Scroll hasta sección Servicios |
| **Resultado esperado** | - 7 tarjetas de servicio presentes<br>- Títulos: Quiropodología, Estudio Biomecánico, Podología Deportiva, Cirugía Ungueal, Podología Infantil, Plantillas Ortopédicas, Atención a Domicilio |

---

## CP-12: Servicios - Flip de tarjetas (hover)

| Campo | Valor |
|---|---|
| **ID** | CP-12 |
| **Sección** | Servicios |
| **Prioridad** | Media |
| **Descripción** | Verificar que las tarjetas hacen flip al hover |
| **Pasos** | 1. Hover sobre la primera tarjeta de servicio |
| **Resultado esperado** | - Al hover, la cara posterior (`service-card-back`) se muestra<br>- Contiene descripción del servicio y tags de features |

---

## CP-13: Sección Nosotros

| Campo | Valor |
|---|---|
| **ID** | CP-13 |
| **Sección** | About |
| **Prioridad** | Alta |
| **Descripción** | Verificar contenido de la sección Nosotros |
| **Pasos** | 1. Scroll hasta #sobre-nosotros |
| **Resultado esperado** | - Título "Pasión por la salud podológica" visible<br>- Nombre "Dra. Julia Aparicio" visible<br>- Badge "Podóloga Colegiada 838-100-503" visible<br>- 4 features visibles (tecnología, atención, taller, domicilio) |

---

## CP-14: Testimonios

| Campo | Valor |
|---|---|
| **ID** | CP-14 |
| **Sección** | Testimonios |
| **Prioridad** | Alta |
| **Descripción** | Verificar los testimonios de pacientes |
| **Pasos** | 1. Scroll hasta #testimonios |
| **Resultado esperado** | - Título "Lo que dicen nuestros pacientes" visible<br>- 3 tarjetas de testimonio presentes<br>- Cada una con estrellas (5), cita, nombre y rol<br>- Nombres: Carlos Sánchez, Elena Martínez, Ricardo Gómez |

---

## CP-15: CTA Banner

| Campo | Valor |
|---|---|
| **ID** | CP-15 |
| **Sección** | CTA |
| **Prioridad** | Media |
| **Descripción** | Verificar la sección de llamada a la acción |
| **Pasos** | 1. Scroll hasta la sección CTA |
| **Resultado esperado** | - Texto "¿Sientes molestias al caminar?" visible<br>- Botón "Reservar Mi Cita Ahora" visible y clickeable |

---

## CP-16: Footer - Contenido

| Campo | Valor |
|---|---|
| **ID** | CP-16 |
| **Sección** | Footer |
| **Prioridad** | Alta |
| **Descripción** | Verificar el contenido del pie de página |
| **Pasos** | 1. Scroll al final de la página |
| **Resultado esperado** | - Logo visible<br>- Dirección: "Av. Virgen de la Montaña, Nº 19, Bajo. 10002 Cáceres"<br>- Teléfono: "+34 679 86 29 54"<br>- Horarios visibles<br>- Links a servicios presentes<br>- Iconos sociales (Instagram, Facebook, LinkedIn)<br>- Copyright visible |

---

## CP-17: Modal de Cita - Apertura y cierre

| Campo | Valor |
|---|---|
| **ID** | CP-17 |
| **Sección** | Modal |
| **Prioridad** | Alta |
| **Descripción** | Verificar apertura y cierre del modal de cita |
| **Pasos** | 1. Click en "Cita Previa" del navbar<br>2. Verificar que modal se abre<br>3. Click en botón cerrar (×)<br>4. Verificar que modal se cierra<br>5. Click en "Reservar Cita Online" del hero<br>6. Verificar modal abierto<br>7. Click fuera del modal |
| **Resultado esperado** | - Modal se abre con clase `active`<br>- Muestra teléfono "679 86 29 54"<br>- Muestra horarios<br>- Se cierra al pulsar ×<br>- Se cierra al hacer click fuera |

---

## CP-18: Modal de Cita - Enlace telefónico

| Campo | Valor |
|---|---|
| **ID** | CP-18 |
| **Sección** | Modal |
| **Prioridad** | Alta |
| **Descripción** | Verificar que el enlace de teléfono tiene el href correcto |
| **Pasos** | 1. Abrir modal de cita<br>2. Verificar enlace de teléfono |
| **Resultado esperado** | - Link con `href="tel:+34679862954"` presente |

---

## CP-19: Chatbot - Abrir y cerrar

| Campo | Valor |
|---|---|
| **ID** | CP-19 |
| **Sección** | Chatbot |
| **Prioridad** | Alta |
| **Descripción** | Verificar apertura y cierre del chatbot |
| **Pasos** | 1. Click en botón chatbot (icono burbuja)<br>2. Verificar ventana abierta<br>3. Click de nuevo para cerrar |
| **Resultado esperado** | - Ventana del chatbot obtiene clase `active`<br>- Muestra mensaje de bienvenida<br>- Al volver a pulsar se cierra |

---

## CP-20: Chatbot - Respuesta a saludo

| Campo | Valor |
|---|---|
| **ID** | CP-20 |
| **Sección** | Chatbot |
| **Prioridad** | Alta |
| **Descripción** | Verificar que el chatbot responde a un saludo |
| **Pasos** | 1. Abrir chatbot<br>2. Escribir "hola"<br>3. Enviar |
| **Resultado esperado** | - Mensaje del usuario aparece en la ventana<br>- Bot responde con saludo que incluye "asistente" |

---

## CP-21: Chatbot - Consulta de horarios

| Campo | Valor |
|---|---|
| **ID** | CP-21 |
| **Sección** | Chatbot |
| **Prioridad** | Alta |
| **Descripción** | Verificar respuesta del chatbot sobre horarios |
| **Pasos** | 1. Abrir chatbot<br>2. Escribir "¿Cuál es el horario?"<br>3. Enviar |
| **Resultado esperado** | - Bot responde con información de horarios (incluye "9:30" y "Lunes a Viernes" o similar) |

---

## CP-22: Chatbot - Consulta de ubicación

| Campo | Valor |
|---|---|
| **ID** | CP-22 |
| **Sección** | Chatbot |
| **Prioridad** | Media |
| **Descripción** | Verificar respuesta del chatbot sobre ubicación |
| **Pasos** | 1. Abrir chatbot<br>2. Escribir "¿Dónde estáis?"<br>3. Enviar |
| **Resultado esperado** | - Bot responde con "Virgen de la Montaña" y "Cáceres" |

---

## CP-23: Chatbot - Consulta de servicios

| Campo | Valor |
|---|---|
| **ID** | CP-23 |
| **Sección** | Chatbot |
| **Prioridad** | Media |
| **Descripción** | Verificar respuesta del chatbot sobre servicios |
| **Pasos** | 1. Abrir chatbot<br>2. Escribir "¿Qué servicios ofrecéis?"<br>3. Enviar |
| **Resultado esperado** | - Bot responde listando servicios (incluye "Quiropodología", "Biomecánico", etc.) |

---

## CP-24: Chatbot - Consulta de precios

| Campo | Valor |
|---|---|
| **ID** | CP-24 |
| **Sección** | Chatbot |
| **Prioridad** | Media |
| **Descripción** | Verificar respuesta del chatbot sobre precios |
| **Pasos** | 1. Abrir chatbot<br>2. Escribir "¿Cuánto cuesta?"<br>3. Enviar |
| **Resultado esperado** | - Bot responde con "35€" |

---

## CP-25: Chatbot - Consulta de seguros

| Campo | Valor |
|---|---|
| **ID** | CP-25 |
| **Sección** | Chatbot |
| **Prioridad** | Media |
| **Descripción** | Verificar respuesta sobre aseguradoras |
| **Pasos** | 1. Abrir chatbot<br>2. Escribir "¿Aceptáis seguro médico?"<br>3. Enviar |
| **Resultado esperado** | - Bot responde mencionando "Caser", "MUFACE" o aseguradoras |

---

## CP-26: Chatbot - Servicios a domicilio

| Campo | Valor |
|---|---|
| **ID** | CP-26 |
| **Sección** | Chatbot |
| **Prioridad** | Media |
| **Descripción** | Verificar respuesta sobre servicios a domicilio |
| **Pasos** | 1. Abrir chatbot<br>2. Escribir "¿Venís a domicilio?"<br>3. Enviar |
| **Resultado esperado** | - Bot responde con "domicilio" y "movilidad reducida" |

---

## CP-27: Estrellas y partículas (Background)

| Campo | Valor |
|---|---|
| **ID** | CP-27 |
| **Sección** | Visual / Fondo |
| **Prioridad** | Baja |
| **Descripción** | Verificar que se generan las estrellas y partículas de fondo |
| **Pasos** | 1. Navegar a la URL base |
| **Resultado esperado** | - Contenedor `#stars-container` tiene hijos (elementos `.star`)<br>- Contenedor `#particles-container` tiene hijos (elementos `.particle`) |

---

## CP-28: Responsive - Servicios en móvil

| Campo | Valor |
|---|---|
| **ID** | CP-28 |
| **Sección** | Servicios - Mobile |
| **Prioridad** | Alta |
| **Descripción** | Verificar que la grid de servicios se adapta a móvil |
| **Precondiciones** | Viewport 375 × 667 |
| **Pasos** | 1. Navegar en viewport móvil<br>2. Scroll hasta servicios |
| **Resultado esperado** | - Las 7 tarjetas de servicios son visibles<br>- Se muestran en columna (layout vertical) |

---

## CP-29: Accesibilidad - Imágenes con alt text

| Campo | Valor |
|---|---|
| **ID** | CP-29 |
| **Sección** | Accesibilidad |
| **Prioridad** | Media |
| **Descripción** | Verificar que todas las imágenes tienen texto alternativo |
| **Pasos** | 1. Navegar a la URL base<br>2. Buscar todas las `<img>` |
| **Resultado esperado** | - Todas las imágenes tienen atributo `alt` no vacío |

---

## CP-30: Rendimiento - Carga en menos de 5 segundos

| Campo | Valor |
|---|---|
| **ID** | CP-30 |
| **Sección** | Rendimiento |
| **Prioridad** | Alta |
| **Descripción** | Verificar que la página carga en un tiempo razonable |
| **Pasos** | 1. Navegar a la URL base y medir `DOMContentLoaded` |
| **Resultado esperado** | - Evento DOMContentLoaded en < 5000ms |

---

## Resumen de Casos

| Prioridad | Cantidad |
|---|---|
| Alta | 16 |
| Media | 12 |
| Baja | 2 |
| **Total** | **30** |
