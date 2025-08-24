#!/usr/bin/env node

/**
 * Script para ejecutar linting en el backend y mostrar un resumen de errores
 * Uso: node lint-check.js [--fix]
 */

import { execSync } from 'child_process'
import path from 'path'

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

const shouldFix = process.argv.includes('--fix')

console.log(`${colors.bold}${colors.blue}🔍 Ejecutando linter para Backend...${colors.reset}\n`)

// Función para ejecutar comandos y capturar salida
function runLinter (command, name, color) {
  console.log(`${colors.bold}${color}📋 ${name}${colors.reset}`)
  console.log(`${colors.cyan}Comando: ${command}${colors.reset}\n`)

  try {
    const output = execSync(command, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: 'pipe'
    })

    if (output.trim()) {
      console.log(output)
    } else {
      console.log(`${colors.green}✅ Sin errores encontrados${colors.reset}`)
    }
  } catch (error) {
    if (error.stdout) {
      console.log(error.stdout)
    }
    if (error.stderr) {
      console.error(`${colors.red}Error: ${error.stderr}${colors.reset}`)
    }

    // Contar errores
    const errorCount = (error.stdout || '').split('\n').filter(line =>
      line.includes('✖') || line.includes('error') || line.includes(': ')
    ).length

    if (errorCount > 0) {
      console.log(`${colors.red}❌ ${errorCount} errores encontrados${colors.reset}`)
    }
  }

  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`)
}

// Ejecutar linter
const fixFlag = shouldFix ? ' --fix' : ''

// JavaScript con StandardJS
runLinter(`npx standard${fixFlag}`, 'JavaScript/Node.js (StandardJS)', colors.yellow)

// Resumen final
console.log(`${colors.bold}${colors.green}🎯 Linting del Backend completado${colors.reset}`)

if (shouldFix) {
  console.log(`${colors.yellow}💡 Se aplicaron correcciones automáticas donde fue posible${colors.reset}`)
  console.log(`${colors.cyan}💡 Ejecuta nuevamente sin --fix para ver errores restantes${colors.reset}`)
} else {
  console.log(`${colors.cyan}💡 Para corregir automáticamente: node lint-check.js --fix${colors.reset}`)
}

console.log(`\n${colors.bold}${colors.blue}📚 Comandos útiles para Backend:${colors.reset}`)
console.log(`${colors.white}• Linting completo: ${colors.cyan}node lint-check.js${colors.reset}`)
console.log(`${colors.white}• Auto-corrección: ${colors.cyan}node lint-check.js --fix${colors.reset}`)
console.log(`${colors.white}• StandardJS directo: ${colors.cyan}npx standard${colors.reset}`)
console.log(`${colors.white}• Corregir con StandardJS: ${colors.cyan}npx standard --fix${colors.reset}`)
console.log(`${colors.white}• Script NPM: ${colors.cyan}npm run lint${colors.reset}`)

console.log(`\n${colors.bold}${colors.magenta}🔧 Errores comunes en Backend:${colors.reset}`)
console.log(`${colors.white}• Variables en snake_case → ${colors.cyan}cambiar a camelCase${colors.reset}`)
console.log(`${colors.white}• Variables no utilizadas → ${colors.cyan}remover o usar${colors.reset}`)
console.log(`${colors.white}• Espacios en blanco → ${colors.cyan}se corrigen automáticamente${colors.reset}`)
console.log(`${colors.white}• Saltos de línea → ${colors.cyan}se corrigen automáticamente${colors.reset}`)
