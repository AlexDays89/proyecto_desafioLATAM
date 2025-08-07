// Array de servicios de tarot disponibles en la tienda
// Cada servicio mantiene la estructura: id, name, price, count, category, img
const productos = [
  {
    id: 1,
    name: "Lectura Rápida - 1 Pregunta",
    price: 2000,
    count: 100, // Disponibilidad ilimitada para servicios digitales
    category: "Lecturas de Tarot",
    img: "https://asew.cl/imgproyectofinal/lecturarapida.jpg"
  },
  {
    id: 2,
    name: "Lectura Rápida - Oferta 3 Preguntas",
    price: 5000,
    count: 100,
    category: "Lecturas de Tarot", 
    img: "https://asew.cl/imgproyectofinal/lroferta.jpg"
  },
  {
    id: 3,
    name: "Lectura Completa",
    price: 25000,
    count: 50, // Menor disponibilidad por ser servicio más personalizado
    category: "Lecturas de Tarot",
    img: "https://asew.cl/imgproyectofinal/lecturacompleta.jpg"
  },
  {
    id: 4,
    name: "Canalización y/o Conexión",
    price: 100000,
    count: 10, // Servicio muy especializado, menor disponibilidad
    category: "Servicios Energéticos",
    img: "https://asew.cl/imgproyectofinal/canalizacion.jpg"
  },
  {
    id: 5,
    name: "Limpieza Energética de Hogares",
    price: 0, // Precio variable - se manejará con botón especial
    count: 20,
    category: "Servicios Energéticos",
    img: "https://asew.cl/imgproyectofinal/limpieza.jpg"
  }
];

export default productos;
