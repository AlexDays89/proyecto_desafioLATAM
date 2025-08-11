INSERT INTO productos (id_producto, nombre, precio, stock, categoria, img) VALUES
('Lectura Rápida - 1 Pregunta', 2000, 100, 'Lecturas de Tarot', 'https://asew.cl/imgproyectofinal/lecturarapida.jpg'),
('Lectura Rápida - Oferta 3 Preguntas', 5000, 100, 'Lecturas de Tarot', 'https://asew.cl/imgproyectofinal/lroferta.jpg'),
('Lectura Completa', 25000, 50, 'Lecturas de Tarot', 'https://asew.cl/imgproyectofinal/lecturacompleta.jpg'),
('Canalización y/o Conexión', 100000, 10, 'Servicios Energeticos', 'https://asew.cl/imgproyectofinal/canalizacion.jpg'),
('Limpieza Energética de Hogares', 250000, 20, 'Servicios Energeticos', 'https://asew.cl/imgproyectofinal/limpieza.jpg');

INSERT INTO usuarios (id_username, mail, password, rol) VALUES
('admin', 'admin@admin.com', 'admin123', 'admin'),
('user', 'user@user.com', 'user123', 'user');

INSERT INTO sessions (user_id, session_token, expires_at) VALUES
(1, 'session_token_1', '2025-08-10 21:45:52'),
(2, 'session_token_2', '2025-08-10 21:45:52');