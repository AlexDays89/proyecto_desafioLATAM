# Guía de Linting para Backend

Este proyecto utiliza **StandardJS** para mantener un código JavaScript/Node.js consistente y de alta calidad en el backend.

## 🛠️ Herramientas de Linting

### StandardJS
- **Propósito**: Linting y formateo de código JavaScript/Node.js
- **Configuración**: Sin configuración necesaria ("zero-config")
- **Estilo**: JavaScript Standard Style

## 📋 Comandos Disponibles

### Scripts NPM
```bash
# Verificar errores de linting
npm run lint

# Corregir errores automáticamente
npm run lint:fix

# Ejecutar script personalizado de verificación
npm run lint:check

# Ejecutar script personalizado con corrección automática
npm run lint:auto
```

### Comandos Directos
```bash
# StandardJS - verificar errores
npx standard

# StandardJS - corregir automáticamente
npx standard --fix

# Script personalizado
node lint-check.js
node lint-check.js --fix
```

## 🔄 Flujo de Trabajo Recomendado

1. **Antes de hacer commit**:
   ```bash
   npm run lint:auto
   ```

2. **Verificar errores restantes**:
   ```bash
   npm run lint:check
   ```

3. **Corregir errores manuales** (si los hay)

4. **Verificar que todo esté limpio**:
   ```bash
   npm run lint
   ```

## 🚨 Errores Comunes y Soluciones

### 1. Variables en snake_case
**Error**: `Identifier 'producto_id' is not in camel case. (camelcase)`

**❌ Incorrecto**:
```javascript
const producto_id = req.params.id
const compra_id = req.body.compra_id
```

**✅ Correcto**:
```javascript
const productoId = req.params.id
const compraId = req.body.compra_id // o req.body.compraId
```

### 2. Variables No Utilizadas
**Error**: `'item' is assigned a value but never used. (no-unused-vars)`

**❌ Incorrecto**:
```javascript
const item = await Product.findById(id) // variable no usada
return res.json({ success: true })
```

**✅ Correcto**:
```javascript
// Opción 1: Usar la variable
const item = await Product.findById(id)
return res.json({ success: true, item })

// Opción 2: Remover si no es necesaria
return res.json({ success: true })
```

### 3. Espacios en Blanco y Saltos de Línea
**Errores**: `no-trailing-spaces`, `eol-last`

**Solución**: Se corrigen automáticamente con `--fix`
```bash
npm run lint:fix
```

## 🔧 Integración con Editor

### VS Code
Instala la extensión "StandardJS - JavaScript Standard Style":
```json
{
  "standard.enable": true,
  "standard.run": "onType",
  "editor.formatOnSave": true
}
```

### Otros Editores
- **Vim**: Plugin `ale` con StandardJS
- **Sublime**: Package `SublimeLinter-contrib-standard`
- **Atom**: Package `linter-js-standard`

## 📊 Interpretando la Salida

### Formato de Error
```
archivo.js:línea:columna: Descripción del error. (regla)
```

### Ejemplo
```
src/controllers/cart.controller.js:43:13: Identifier 'producto_id' is not in camel case. (camelcase)
```
- **Archivo**: `src/controllers/cart.controller.js`
- **Línea**: 43
- **Columna**: 13
- **Error**: Variable no está en camelCase
- **Regla**: `camelcase`

## 🎯 Pre-commit con Husky

El proyecto está configurado con Husky y lint-staged para ejecutar linting automáticamente antes de cada commit:

```json
"lint-staged": {
  "*.js": "standard"
}
```

Esto significa que:
- Solo se ejecuta en archivos modificados
- Se ejecuta automáticamente antes del commit
- Previene commits con errores de linting

## 📈 Estado Actual del Proyecto

### Errores Encontrados
1. **Variables en snake_case**: `producto_id`, `compra_id` en cart.controller.js
2. **Variables no utilizadas**: `item` en cart.model.js
3. **Saltos de línea**: Algunos archivos necesitan salto de línea al final

### Archivos Afectados
- `src/server/api/v1/controllers/cart.controller.js`
- `src/server/api/v1/models/cart.model.js`
- `src/server/api/v1/schemas/products.schema.js`
- `src/server/middlewares/auth.middleware.js`

## 🚀 Próximos Pasos

1. Ejecutar `npm run lint:auto` para correcciones automáticas
2. Corregir manualmente variables en snake_case
3. Revisar y corregir variables no utilizadas
4. Verificar que todos los archivos pasen el linting
5. Configurar tu editor para linting en tiempo real

## 📚 Recursos Adicionales

- [JavaScript Standard Style](https://standardjs.com/)
- [Reglas de StandardJS](https://standardjs.com/rules.html)
- [StandardJS en GitHub](https://github.com/standard/standard)