import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './vitest.setup.js',
    watch: false,
    root: './', // Define la raíz del proyecto para las pruebas.
    dir: './test', // Define el directorio donde buscar archivos de test.
    coverage: {
      provider: 'v8',
      enabled: true,
      reportsDirectory: './coverage', // Define el directorio donde se guardarán los reportes de cobertura generados.
      reporter: ['text', 'html'],
      include: ['**/src/**'],
      exclude: [] // Excluye archivos y carpetas del cálculo de cobertura.
    },
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    verbose: true
  }
})
