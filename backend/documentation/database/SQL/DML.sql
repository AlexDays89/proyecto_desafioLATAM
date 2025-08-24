
-- =============================================
-- CONSULTAS DE SELECCIÓN COMUNES
-- =============================================

-- Obtener todos los usuarios
SELECT * FROM usuarios;

-- Obtener todos los productos disponibles
SELECT * FROM productos WHERE activo = TRUE AND stock > 0;

-- Obtener productos por categoría
SELECT * FROM productos WHERE categoria = 'Electrónicos' AND activo = TRUE;

-- Obtener carrito activo de un usuario
SELECT 
    p.id,
    p.nombre,
    p.precio,
    cai.cantidad,
    (p.precio * cai.cantidad) AS subtotal
FROM carrito_activo_items cai
JOIN carritos_activos ca ON cai.carrito_activo_id = ca.id
JOIN productos p ON cai.producto_id = p.id
WHERE ca.usuario_id = 2;

-- Obtener historial de compras de un usuario
SELECT 
    c.id AS compra_id,
    c.fecha_compra,
    c.total,
    c.estado,
    ci.producto_id,
    p.nombre AS producto_nombre,
    ci.cantidad,
    ci.precio_unitario
FROM compras c
JOIN carrito_items ci ON c.id = ci.compra_id
JOIN productos p ON ci.producto_id = p.id
WHERE c.usuario_id = 2
ORDER BY c.fecha_compra DESC;

-- Obtener perfil de usuario
SELECT id, usuario, mail, direccion, rol, created_at FROM usuarios WHERE id = 2;

-- =============================================
-- CONSULTAS ADMINISTRATIVAS
-- =============================================

-- Obtener stock de todos los productos
SELECT id, nombre, stock, categoria FROM productos ORDER BY stock ASC;

-- Obtener todos los pedidos
SELECT 
    c.id,
    u.usuario,
    c.fecha_compra,
    c.total,
    c.estado,
    c.metodo_pago
FROM compras c
JOIN usuarios u ON c.usuario_id = u.id
ORDER BY c.fecha_compra DESC;

-- Obtener tickets de soporte
SELECT 
    t.id,
    u.usuario,
    t.mensaje,
    t.estado,
    t.fecha
FROM tickets t
JOIN usuarios u ON t.usuario_id = u.id
ORDER BY t.fecha DESC;

