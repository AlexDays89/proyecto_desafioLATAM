INSERT INTO productos (id_producto, nombre, precio, stock, categoria, img, descripcion) VALUES
(1, 'Lectura Rápida - 1 Pregunta', 2000, 100, 'Lecturas de Tarot', 'https://asew.cl/imgproyectofinal/lecturarapida.jpg', 'Consulta rápida y directa para resolver una pregunta específica. Ideal para obtener claridad inmediata sobre situaciones puntuales en tu vida.'),
(2, 'Lectura Rápida - Oferta 3 Preguntas', 5000, 100, 'Lecturas de Tarot', 'https://asew.cl/imgproyectofinal/lroferta.jpg', 'Paquete especial que incluye tres preguntas en una sola sesión. Perfecto para explorar diferentes aspectos de tu vida con un precio preferencial.'),
(3, 'Lectura Completa', 25000, 50, 'Lecturas de Tarot', 'https://asew.cl/imgproyectofinal/lecturacompleta.jpg', 'Sesión completa y detallada que abarca múltiples aspectos de tu vida. Incluye análisis profundo de pasado, presente y futuro con guía personalizada.'),
(4, 'Canalización y/o Conexión', 100000, 10, 'Servicios Energeticos', 'https://asew.cl/imgproyectofinal/canalizacion.jpg', 'Servicio especializado de conexión espiritual y canalización de mensajes. Incluye comunicación con guías espirituales y seres queridos que han partido.'),
(5, 'Limpieza Energética de Hogares', 250000, 20, 'Servicios Energeticos', 'https://asew.cl/imgproyectofinal/limpieza.jpg', 'Servicio presencial de limpieza y armonización energética de espacios. Elimina energías negativas y restablece el equilibrio en tu hogar.');

INSERT INTO usuarios (id_username, mail, password, rol) VALUES
('admin', 'admin@admin.com', 'admin123', 'admin'),
('user', 'user@user.com', 'user123', 'user');

INSERT INTO sessions (user_id, session_token, expires_at) VALUES
(1, 'session_token_1', '2025-08-10 21:45:52'),
(2, 'session_token_2', '2025-08-10 21:45:52');