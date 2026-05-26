import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión — Panel CMS",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
            Panel de Administración
          </h1>
          <p className="text-sm text-zinc-500">Ingresa tus credenciales para continuar</p>
        </div>

        {/* Form — client action */}
        <form action="/api/auth/login" method="POST" className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              autoComplete="username"
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre de usuario"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu contraseña"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
            ← Volver al sitio
          </a>
        </div>
      </div>
    </div>
  );
}
