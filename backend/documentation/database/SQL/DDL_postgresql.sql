-- DROP DATABASE IF EXISTS tienda_online;
-- DROP TABLES IF EXISTS (uncomment to reset database)

-- Nota: En PostgreSQL, primero debes crear la base de datos manualmente:
-- CREATE DATABASE tienda_online;
-- Luego conectarte a ella: \c tienda_online;

-- Tabla para almacenar la información de los usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(20) NOT NULL,
    direccion VARCHAR(255),
    mail VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'cliente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para almacenar los productos de la tienda
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    descripcion TEXT,
    imagen_url VARCHAR(500),
    categoria VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para registrar las compras completadas por los usuarios
CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(50) DEFAULT 'completada',
    metodo_pago VARCHAR(50),
    direccion_envio VARCHAR(255),
    CONSTRAINT fk_compras_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de detalle para cada compra, relacionando productos y cantidades
CREATE TABLE carrito_items (
    id SERIAL PRIMARY KEY,
    compra_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_carrito_items_compra FOREIGN KEY (compra_id) REFERENCES compras(id) ON DELETE CASCADE,
    CONSTRAINT fk_carrito_items_producto FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Tabla para gestionar los carritos de compra activos de los usuarios
CREATE TABLE carritos_activos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carritos_activos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de detalle para los carritos activos, con los productos que el usuario ha agregado
CREATE TABLE carrito_activo_items (
    id SERIAL PRIMARY KEY,
    carrito_activo_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carrito_activo_items_carrito FOREIGN KEY (carrito_activo_id) REFERENCES carritos_activos(id) ON DELETE CASCADE,
    CONSTRAINT fk_carrito_activo_items_producto FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    -- Restricción para asegurar que no se repita el mismo producto en el mismo carrito
    CONSTRAINT uq_carrito_activo_producto UNIQUE (carrito_activo_id, producto_id)
);

-- Tabla para tickets de soporte (administración)
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    mensaje TEXT NOT NULL,
    estado VARCHAR(50) DEFAULT 'abierto',
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    respuesta TEXT,
    fecha_respuesta TIMESTAMP NULL,
    CONSTRAINT fk_tickets_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_usuarios_mail ON usuarios(mail);
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
CREATE INDEX idx_productos_categoria ON productos(categoria);
CREATE INDEX idx_productos_activo ON productos(activo);
CREATE INDEX idx_compras_usuario ON compras(usuario_id);
CREATE INDEX idx_compras_fecha ON compras(fecha_compra);
CREATE INDEX idx_carrito_items_compra ON carrito_items(compra_id);
CREATE INDEX idx_carrito_items_producto ON carrito_items(producto_id);
CREATE INDEX idx_carrito_activo_items_carrito ON carrito_activo_items(carrito_activo_id);
CREATE INDEX idx_carrito_activo_items_producto ON carrito_activo_items(producto_id);
CREATE INDEX idx_tickets_usuario ON tickets(usuario_id);
CREATE INDEX idx_tickets_estado ON tickets(estado);
