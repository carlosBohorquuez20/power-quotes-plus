# Power Quotes+

Aplicación web motivacional desarrollada en React, diseñada para mostrar frases inspiradoras según el estado emocional del usuario. Incluye historial, favoritos, modo oscuro, audio, calendario emocional y despliegue en GitHub Pages.

## Características principales

- **Selector de emociones:** Elige cómo te sientes y recibe frases motivacionales personalizadas.
- **Historial y favoritos:** Consulta frases vistas y guarda tus favoritas.
- **Modo oscuro:** Interfaz moderna con soporte para modo claro/oscuro.
- **Audio (Text-to-Speech):** Escucha las frases en voz alta.
- **Calendario emocional:** Visualiza tu registro de emociones por fecha.
- **Notificaciones:** Recibe frases motivacionales periódicamente.
- **Compartir:** Comparte frases fácilmente con el botón universal.
- **Diseño responsive:** Mobile-first, adaptado a cualquier dispositivo.
- **Despliegue:** Disponible en GitHub Pages.

## Demo

[Ver app en GitHub Pages](https://carlosBohorquuez20.github.io/power-quotes-plus/)

## Instalación y uso local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/carlosBohorquuez20/power-quotes-plus.git
   cd power-quotes-plus
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia la app en modo desarrollo:
   ```bash
   npm start
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue en GitHub Pages

1. Asegúrate de tener configurado el campo `homepage` en `package.json`.
2. Ejecuta:
   ```bash
   npm run deploy
   ```

## Estructura del proyecto

- `src/` - Código fuente principal
  - `components/` - Componentes React (MoodSelector, QuoteDisplay, Settings, History)
  - `data/quotes.json` - Frases motivacionales
  - `services/` - Lógica de frases y notificaciones
  - `utils/` - Utilidades (localStorage)
- `public/` - Archivos estáticos
- `build/` - Salida de producción (no editar manualmente)

## Tecnologías usadas
- React
- Tailwind CSS (clases utilitarias)
- GitHub Pages
- Web APIs: SpeechSynthesis, Web Share, Notifications

## Autor
Carlos Bohorquuez

---
¡Disfruta y comparte tu motivación diaria con Power Quotes+! 🚀
