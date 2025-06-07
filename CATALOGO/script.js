// Datos de los productos
const products = [
  {
    id: 1,
    name: "Leche Capilar",
    price: "$50.000",
    description: "Nuestra Leche Capilar es un tratamiento intensivo de hidratación formulado especialmente para cabellos secos, maltratados y con frizz.",
    image: "imagenes/leche_pal_pelo.jpg",
    category: "hidratacion"
  },
  {
    id: 2,
    name: "Bomba Capilar",
    price: "$50.000",
    description: "La Bomba Capilar Glow Vi es un cóctel nutritivo que fortalece el cabello desde la raíz hasta las puntas. Ideal para cabellos quebradizos y con tendencia a la caída.",
    image: "imagenes/bomba1.jpg",
    category: "reparacion"
  },
  {
    id: 3,
    name: "Tratamiento de Cebolla",
    price: "$50.000",
    description: "Nuestro exclusivo Tratamiento de Cebolla está científicamente formulado para estimular el folículo piloso y promover el crecimiento saludable del cabello.",
    image: "imagenes/cebolla.jpg",
    category: "crecimiento"
  },
  {
    id: 4,
    name: "Mantequilla de Coco",
    price: "$50.000",
    description: "La Mantequilla de Coco Glow Vi es un tratamiento reconstructivo para cabellos extremadamente secos, teñidos o con químicos. Su fórmula rica en ácidos grasos nutre profundamente.",
    image: "imagenes/coco1.jpg",
    category: "reparacion"
  }
];

// Variables del modal
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-modal');
const quickViewButtons = document.querySelectorAll('.quick-view');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Abrir modal al hacer clic en Vista Rápida
quickViewButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product');
        openModal(productId);
    });
});

// Abrir modal al hacer clic en Añadir al carrito
addToCartButtons.forEach(button => {
  button.addEventListener('click', function () {
    const productName = this.getAttribute('data-name');
    const productPrice = this.getAttribute('data-price');

    const rawMessage = `🌸 ¡Hola Glowvi! 💖\nQuisiera comprar el producto: *${productName}* 🛍️\n💵 Precio: *${productPrice}*\n✨ ¿Podrías darme más información, por fa? 🙏🏼💕`;
    const encodedMessage = encodeURIComponent(rawMessage);
    const phone = "573144059343";

    const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
    window.open(url, '_blank');
  });
});

// Función para abrir el modal
function openModal(productId) {
    const product = products.find(p => p.id == productId);
    
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductNameText').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = product.price;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductImage').style.backgroundImage = `url('${product.image}')`;
    document.getElementById('modalAddToCart').setAttribute('data-product', productId);
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer clic fuera del contenido
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Controlador de cantidad
const minusBtn = document.querySelector('.quantity-btn.minus');
const plusBtn = document.querySelector('.quantity-btn.plus');
const quantityInput = document.querySelector('.quantity-input');

minusBtn.addEventListener('click', function() {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
        quantityInput.value = value - 1;
    }
});

plusBtn.addEventListener('click', function() {
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
});

// Añadir al carrito desde el modal (redirige a WhatsApp)
document.getElementById('modalAddToCart').addEventListener('click', function() {
    const productId = this.getAttribute('data-product');
    const product = products.find(p => p.id == productId);
    const quantity = parseInt(quantityInput.value);
    
    // Crear mensaje para WhatsApp
    const message = `¡Hola Glow Vi! Estoy interesad@ en comprar:\n\n*${quantity} x ${product.name} - ${product.price}*\n\nPor favor, necesito más información sobre este producto.`;
    const encodedMessage = encodeURIComponent(message);
    
    // Redirigir a WhatsApp
    window.open(`https://wa.me/573144059343?text=${encodedMessage}`, '_blank');
    
    // Cerrar el modal
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Crear flores que caen
function crearFlores() {
    const floresContainer = document.getElementById('flores-container');
    const flores = ['✿', '✽', '❀', '✾', '🌸', '🌺', '🌼'];
    
    for (let i = 0; i < 15; i++) {
        const flor = document.createElement('div');
        flor.className = 'flor';
        flor.textContent = flores[Math.floor(Math.random() * flores.length)];
        flor.style.left = Math.random() * 100 + 'vw';
        flor.style.fontSize = (Math.random() * 20 + 10) + 'px';
        flor.style.animationDuration = (Math.random() * 10 + 5) + 's';
        flor.style.animationDelay = Math.random() * 5 + 's';
        floresContainer.appendChild(flor);
    }
}

// Crear partículas para el fondo escarchado
function crearParticulas() {
    const container = document.getElementById('particles-container');
    const count = 100;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Tamaño aleatorio
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Opacidad y animación
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        particle.style.animationDuration = `${Math.random() * 15 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
    }
}

// Búsqueda de productos
document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const name = card.querySelector('.product-name').textContent.toLowerCase();
    const description = card.querySelector('.product-description').textContent.toLowerCase();

    if (name.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Filtros por categoría
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Actualizar botones activos
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedCategory = btn.getAttribute('data-category');
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (selectedCategory === "all" || selectedCategory === cardCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Llamar a las funciones cuando se cargue la página
window.addEventListener('load', () => {
  crearFlores();
  crearParticulas();
});
// 🌙 Modo oscuro con persistencia
const toggleThemeBtn = document.getElementById('toggleTheme');
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

// 🛒 Carrito con contador visual
let cartCount = 0;
const cartCountSpan = document.getElementById('cartCount');

// Contador desde botones "Añadir al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    cartCountSpan.textContent = cartCount;
    showToast("Producto añadido al carrito 🛍️");
  });
});

// Contador desde botón del modal
document.getElementById('modalAddToCart').addEventListener('click', () => {
  cartCount++;
  cartCountSpan.textContent = cartCount;
  showToast("Producto añadido al carrito 🛍️");
});

// 🔔 Notificación tipo toast
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// 💬 Testimonios rotativos
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

setInterval(() => {
  testimonials[currentTestimonial].classList.remove('active');
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial].classList.add('active');
}, 4000);
function lanzarConfeti() {
    confetti({
        particleCount: 150,       // Cantidad de partículas
        spread: 70,               // Ángulo de dispersión
        origin: { y: 0.6 },       // Posición Y de origen (0 = arriba, 1 = abajo)
        colors: ['#ff69b4', '#ffd1dc', '#e75480', '#ffffff'] // Colores rosas/blancos
    });
}
// Ejemplo en tus event listeners de compra:
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        lanzarConfeti(); // ¡Confeti al añadir al carrito!
        // ... resto de tu código
    });
});
