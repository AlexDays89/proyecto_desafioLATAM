CREATE TABLE usuarios (
    id_username SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    direccion VARCHAR(255),
    mail VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(16) NOT NULL,
    rol VARCHAR(20) DEFAULT 'user'
);


CREATE TABLE sessions (
    id_sesion SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

CREATE TABLE carritos_activos (
    id_carrito INTEGER PRIMARY KEY,
    id_usuario INTEGER UNIQUE NOT NULL,
    CONSTRAINT fk_carritos_activos_id_usuario_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id_username)
);

CREATE TABLE compras (
    id_compra INTEGER PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10, 2) NOT NULL,
    CONSTRAINT fk_compras_id_usuario_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id_username)
);

CREATE TABLE productos (
    id_producto INTEGER PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    img VARCHAR(255) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descripcion TEXT
);

CREATE TABLE carrito_items (
    id_item INTEGER PRIMARY KEY,
    id_compra INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10, 2) NOT NULL,
    CONSTRAINT fk_carrito_items_id_compra_compras FOREIGN KEY (id_compra) REFERENCES compras(id_compra),
    CONSTRAINT fk_carrito_items_id_producto_productos FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE carrito_activo_items (
    id_item INTEGER PRIMARY KEY,
    id_carrito INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    CONSTRAINT fk_carrito_activo_items_id_carrito_carritos_activos FOREIGN KEY (id_carrito) REFERENCES carritos_activos(id_carrito),
    CONSTRAINT fk_carrito_activo_items_id_producto_productos FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    CONSTRAINT uq_carrito_activo_producto UNIQUE (id_carrito, id_producto)
);
