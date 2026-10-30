const fs = require("fs");

const css = `@import "tailwindcss";

@layer base {
  :root {
    --primary-blue: #1E40AF;
    --primary-blue-hover: #1D4ED8;
    --accent-teal: #14B8A6;
    --accent-teal-hover: #0D9488;
    --bg-light: #F8FAFC;
    --surface-light: #FFFFFF;
    --border-light: #E2E8F0;
    --text-primary: #0F172A;
    --text-secondary: #475569;
    --text-muted: #64748B;
  }

  .dark {
    --bg-light: #0B1120;
    --surface-light: #131D31;
    --border-light: #1E293B;
    --text-primary: #F8FAFC;
    --text-secondary: #94A3B8;
    --text-muted: #64748B;
  }
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: var(--bg-light);
  color: var(--text-primary);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* Custom Healthcare Glows & Glassmorphism */
.glass-panel {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.dark .glass-panel {
  background: rgba(19, 29, 49, 0.85);
  border: 1px solid rgba(30, 41, 59, 0.8);
}

.health-gradient {
  background: linear-gradient(135deg, #1E40AF 0%, #0284C7 50%, #14B8A6 100%);
}

.health-gradient-subtle {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(20, 184, 166, 0.05) 100%);
}

.dark .health-gradient-subtle {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(20, 184, 166, 0.15) 100%);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 9999px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #334155;
}
::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse-glow {
  animation: pulseGlow 4s ease-in-out infinite;
}
`;

fs.writeFileSync("src/app/globals.css", css, "utf8");
console.log("Updated src/app/globals.css successfully!");
