import { build } from 'esbuild'

build({
  entryPoints: ['src/index.js'],
  outfile: 'dist/index.cjs',
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node22',
  jsx: 'automatic',
  jsxImportSource: 'react',
  define: {
    'process.env.NODE_ENV': '"production"'
  }
}).catch(() => process.exit(1))
