// Datos de los productos
const products = [
  {
    id: 1,
    name: "Leche Capilar",
    price: "$50.000",
    description: "Nuestra Leche Capilar es un tratamiento intensivo de hidratación formulado especialmente para cabellos secos, maltratados y con frizz.",
    image: "img/leche_pal_pelo.jpg",
    category: "hidratacion"
  },
  {
    id: 2,
    name: "Bomba Capilar",
    price: "$50.000",
    description: "La Bomba Capilar Glow Vi es un cóctel nutritivo que fortalece el cabello desde la raíz hasta las puntas. Ideal para cabellos quebradizos y con tendencia a la caída.",
    image: "img/bomba1.jpg",
    category: "reparacion"
  },
  {
    id: 3,
    name: "Tratamiento de Cebolla",
    price: "$50.000",
    description: "Nuestro exclusivo Tratamiento de Cebolla está científicamente formulado para estimular el folículo piloso y promover el crecimiento saludable del cabello.",
    image: "img/cebolla.jpg",
    category: "crecimiento"
  },
  {
    id: 4,
    name: "Mantequilla de Coco",
    price: "$50.000",
    description: "La Mantequilla de Coco Glow Vi es un tratamiento reconstructivo para cabellos extremadamente secos, teñidos o con químicos. Su fórmula rica en ácidos grasos nutre profundamente.",
    image: "img/coco1.jpg",
    category: "reparacion"
  }
];

// Variables del modal
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-modal');
const quickViewButtons = document.querySelectorAll('.quick-view');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Función para detectar si es móvil
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Función para abrir WhatsApp
function openWhatsApp(productName, productPrice, quantity = 1) {
  const phoneNumber = "573144059343";
  const rawMessage = `🌸 ¡Hola Glowvi! 💖\nQuisiera comprar:\n\n*${quantity} x ${productName}*\n💵 Precio: *${productPrice}*\n✨ ¿Podrías darme más información? 🙏🏼💕`;
  const encodedMessage = encodeURIComponent(rawMessage);

  const whatsappUrl = isMobileDevice()
    ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}

// Configurar botón flotante de WhatsApp
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
  whatsappFloat.href = isMobileDevice()
    ? "https://api.whatsapp.com/send?phone=573144059343&text=Hola%20GlowVi,%20quisiera%20más%20información"
    : "https://web.whatsapp.com/send?phone=573144059343&text=Hola%20GlowVi,%20quisiera%20más%20información";
}

// Abrir modal al hacer clic en Vista Rápida
quickViewButtons.forEach(button => {
  button.addEventListener('click', function () {
    const productId = this.getAttribute('data-product');
    openModal(productId);
  });
});

// Configurar botones "Añadir al carrito"
addToCartButtons.forEach(button => {
  button.addEventListener('click', function () {
    cartCount++;
    cartCountSpan.textContent = cartCount;
    showToast("Producto añadido al carrito 🛍️");

    lanzarConfeti();

    const productName = this.getAttribute('data-name');
    const productPrice = this.getAttribute('data-price');

    openWhatsApp(productName, productPrice);
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
closeModal.addEventListener('click', function () {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer clic fuera del contenido
modal.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Controlador de cantidad
const minusBtn = document.querySelector('.quantity-btn.minus');
const plusBtn = document.querySelector('.quantity-btn.plus');
const quantityInput = document.querySelector('.quantity-input');

minusBtn.addEventListener('click', function () {
  let value = parseInt(quantityInput.value);
  if (value > 1) {
    quantityInput.value = value - 1;
  }
});

plusBtn.addEventListener('click', function () {
  let value = parseInt(quantityInput.value);
  quantityInput.value = value + 1;
});

// Añadir al carrito desde el modal
document.getElementById('modalAddToCart').addEventListener('click', function () {
  const productId = this.getAttribute('data-product');
  const product = products.find(p => p.id == productId);
  const quantity = parseInt(quantityInput.value);

  cartCount++;
  cartCountSpan.textContent = cartCount;
  showToast("Producto añadido al carrito 🛍️");

  lanzarConfeti();

  openWhatsApp(product.name, product.price, quantity);

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

// Función para lanzar confeti
function lanzarConfeti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff69b4', '#ffd1dc', '#e75480', '#ffffff']
  });
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

// 🌙 Modo oscuro con persistencia
const toggleThemeBtn = document.getElementById('toggleTheme');
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// 🛒 Carrito con contador visual
let cartCount = 0;
const cartCountSpan = document.getElementById('cartCount');

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

// Inicialización cuando se carga la página
window.addEventListener('load', () => {
  // Verificar modo oscuro
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Crear elementos decorativos
  crearFlores();
});
