// Array de servicios de tarot disponibles en la tienda
// Cada servicio mantiene la estructura: id, name, price, count, category, img
const productos = [
  {
    id: 1,
    name: "Lectura Rápida - 1 Pregunta",
    price: 2000,
    count: 100, // Disponibilidad ilimitada para servicios digitales
    category: "Lecturas de Tarot",
    img: "https://asew.cl/imgproyectofinal/lecturarapida.jpg",
    description: "Consulta rápida y directa para resolver una pregunta específica. Ideal para obtener claridad inmediata sobre situaciones puntuales en tu vida."
  },
  {
    id: 2,
    name: "Lectura Rápida - Oferta 3 Preguntas",
    price: 5000,
    count: 100,
    category: "Lecturas de Tarot", 
    img: "https://asew.cl/imgproyectofinal/lroferta.jpg",
    description: "Paquete especial que incluye tres preguntas en una sola sesión. Perfecto para explorar diferentes aspectos de tu vida con un precio preferencial."
  },
  {
    id: 3,
    name: "Lectura Completa",
    price: 25000,
    count: 50, // Menor disponibilidad por ser servicio más personalizado
    category: "Lecturas de Tarot",
    img: "https://asew.cl/imgproyectofinal/lecturacompleta.jpg",
    description: "Sesión completa y detallada que abarca múltiples aspectos de tu vida. Incluye análisis profundo de pasado, presente y futuro con guía personalizada."
  },
  {
    id: 4,
    name: "Canalización y/o Conexión",
    price: 100000,
    count: 10, // Servicio muy especializado, menor disponibilidad
    category: "Servicios Energeticos",
    img: "https://asew.cl/imgproyectofinal/canalizacion.jpg",
    description: "Servicio especializado de conexión espiritual y canalización de mensajes. Incluye comunicación con guías espirituales y seres queridos que han partido."
  },
  {
    id: 5,
    name: "Limpieza Energética de Hogares",
    price: 250000, // Precio variable - se manejará con botón especial
    count: 20,
    category: "Servicios Energeticos",
    img: "https://asew.cl/imgproyectofinal/limpieza.jpg",
    description: "Servicio presencial de limpieza y armonización energética de espacios. Elimina energías negativas y restablece el equilibrio en tu hogar."
  }
];

export default productos;
