# Ejemplos de Corrección de Errores de Linting - Backend

Esta guía contiene ejemplos específicos para corregir los errores de linting encontrados en el backend.

## 🔧 Errores Específicos Encontrados

### 1. Variables en snake_case → camelCase

#### Error en `cart.controller.js`
**Ubicaciones**: Líneas 43, 89, 144, 264

**❌ Código Actual (Incorrecto)**:
```javascript
// Línea 43
const { producto_id } = req.body

// Línea 89
const { producto_id } = req.body

// Línea 144
const { producto_id } = req.body

// Línea 264
const { compra_id } = req.body
```

**✅ Código Corregido**:
```javascript
// Opción 1: Cambiar nombre de variable
const { producto_id: productoId } = req.body

// Opción 2: Si el campo en la base de datos es snake_case
const { producto_id } = req.body
const productoId = producto_id // Crear variable en camelCase

// Para compra_id
const { compra_id: compraId } = req.body
```

### 2. Variable No Utilizada

#### Error en `cart.model.js`
**Ubicación**: Línea 59

**❌ Código Actual (Incorrecto)**:
```javascript
// Línea 59
const item = await SomeModel.findById(id) // Variable asignada pero no usada
return { success: true }
```

**✅ Opciones de Corrección**:

**Opción A - Usar la variable**:
```javascript
const item = await SomeModel.findById(id)
return { success: true, item }
```

**Opción B - Remover si no es necesaria**:
```javascript
// Simplemente remover la línea si no se necesita
return { success: true }
```

**Opción C - Si se necesita para validación**:
```javascript
const item = await SomeModel.findById(id)
if (!item) {
  throw new Error('Item not found')
}
return { success: true }
```

## 🛠️ Script de Corrección Automática

### Paso 1: Ejecutar Corrección Automática
```bash
cd backend
npm run lint:auto
```

### Paso 2: Verificar Errores Restantes
```bash
npm run lint:check
```

### Paso 3: Correcciones Manuales

#### Para Variables en snake_case:
1. Abrir `src/server/api/v1/controllers/cart.controller.js`
2. Buscar líneas 43, 89, 144, 264
3. Aplicar una de las correcciones mostradas arriba

#### Para Variables No Utilizadas:
1. Abrir `src/server/api/v1/models/cart.model.js`
2. Buscar línea 59
3. Decidir si usar, modificar o remover la variable

## 📋 Plantilla de Corrección Paso a Paso

### 1. Identificar el Error
```bash
# Ejecutar linting para ver errores específicos
npm run lint
```

### 2. Localizar el Archivo y Línea
```
Ejemplo de salida:
src/server/api/v1/controllers/cart.controller.js:43:13: Identifier 'producto_id' is not in camel case. (camelcase)
```
- **Archivo**: `src/server/api/v1/controllers/cart.controller.js`
- **Línea**: 43
- **Columna**: 13

### 3. Aplicar Corrección
```javascript
// ANTES
const { producto_id } = req.body

// DESPUÉS
const { producto_id: productoId } = req.body
// O
const productoId = req.body.producto_id
```

### 4. Verificar Corrección
```bash
npm run lint
```

## 🎯 Correcciones Específicas por Archivo

### `cart.controller.js`
```javascript
// Línea 43 - ANTES
const { producto_id } = req.body

// Línea 43 - DESPUÉS
const { producto_id: productoId } = req.body

// Línea 89 - ANTES
const { producto_id } = req.body

// Línea 89 - DESPUÉS
const { producto_id: productoId } = req.body

// Línea 144 - ANTES
const { producto_id } = req.body

// Línea 144 - DESPUÉS
const { producto_id: productoId } = req.body

// Línea 264 - ANTES
const { compra_id } = req.body

// Línea 264 - DESPUÉS
const { compra_id: compraId } = req.body
```

### `cart.model.js`
```javascript
// Línea 59 - ANTES
const item = await SomeModel.findById(id) // No usado

// Línea 59 - DESPUÉS (Opción 1: Usar)
const item = await SomeModel.findById(id)
return { ...otherData, item }

// Línea 59 - DESPUÉS (Opción 2: Remover)
// Simplemente eliminar la línea si no se necesita
```

## ✅ Verificación Final

### Script Completo de Verificación
```bash
# 1. Ir al directorio del backend
cd backend

# 2. Ejecutar corrección automática
npm run lint:auto

# 3. Verificar estado
npm run lint:check

# 4. Si hay errores, corregir manualmente
# 5. Verificar que todo esté limpio
npm run lint
```

### Resultado Esperado
```
✅ Sin errores encontrados
```

## 🚀 Consejos Adicionales

1. **Consistencia**: Mantén el mismo patrón de nomenclatura en todo el proyecto
2. **Destructuring**: Usa destructuring con renombrado para mantener camelCase
3. **Variables**: Solo declara variables que realmente vas a usar
4. **Automatización**: Configura tu editor para aplicar StandardJS automáticamente

## 📚 Recursos

- [StandardJS Rules](https://standardjs.com/rules.html)
- [JavaScript Naming Conventions](https://www.robinwieruch.de/javascript-naming-conventions)
- [ES6 Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)