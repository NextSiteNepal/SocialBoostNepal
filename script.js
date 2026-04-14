// ===== INITIALIZE LUCIDE ICONS =====
lucide.createIcons();

// ===== PARTICLE BACKGROUND =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = ['139,92,246', '59,130,246', '16,185,129'][Math.floor(Math.random() * 3)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Mouse interaction
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      this.x -= dx * 0.005;
      this.y -= dy * 0.005;
    }

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  // Draw connections
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach((b) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
let menuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('hidden');

  if (menuOpen) {
    menuIcon.setAttribute('data-lucide', 'x');
  } else {
    menuIcon.setAttribute('data-lucide', 'menu');
  }
  lucide.createIcons();
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.add('hidden');
    menuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  });
});

// ===== SCROLL ANIMATIONS =====
const scrollElements = document.querySelectorAll('.scroll-animate');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

scrollElements.forEach((el) => observer.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((c) => counterObserver.observe(c));

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 60;
  const duration = 2000;
  const stepTime = duration / 60;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString() + (target >= 100 ? '+' : '+');
  }, stepTime);
}

// ===== PROGRESS BAR ANIMATION =====
const progressBars = document.querySelectorAll('.progress-bar');

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        setTimeout(() => {
          entry.target.style.width = width;
        }, 300);
        progressObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

progressBars.forEach((bar) => progressObserver.observe(bar));

// ===== PRICING DATA & LOGIC =====
const pricingData = {
  instagram: [
    {
      name: 'LIKES',
      price: 'Likes starting at just Rs 50 ',
      quantity: 'Premium quality likes available',
      features: ['200 likes :- Rs 50', '500 likes :- Rs 65', '1000 likes :- Rs 100', '2000 likes :- 145', '5,000 followers :- Rs 300','10,000 likes :- Rs 570','50,000 followers :- Rs 2450'],
      popular: false,
    },
    {
      name: 'FOLLOWERS',
      price: 'FOLLOWERS STARTING AT JUST RS 70 Rs',
      quantity: 'Premium quality accounts with 60 days refill guarantee',
      features: ['100 followers :- Rs 70', '200 followers :- Rs 120', '500 followers :- Rs 220', '1000 followers :- Rs 275-315', '2,000 followers :- Rs 400','5,000 followers :- Rs 1100','10,000 followers :- Rs 1700'],
      popular: true,
    },
    {
      name: 'Views',
      price: 'Views starting at just Rs 50',
      quantity: 'Permanent views with quality acc with refill guarantee',
      features: ['500 views for 50 rs', '1000 views for 80', '5000 views for 200', '10,000 views for  330', '50,000 likes for 400', 'Bonus likes available at every purchase'],
      popular: false,
    },
  ],
  youtube: [
    {
      name: 'VIEWS',
      price: 'youtube views available',
      quantity: 'Views available at lowest cost',
      features: ['DM IN WHATS APP TO GET DETAILS', '0-12 hour delivery', '30-day refill guarantee', 'No password required'],
      popular: false,
    },
    {
      name: 'SUBSCRIBERS',
      price: 'Youtube subscribers available',
      quantity: 'Premium quality subscribers available',
      features: ['DM IN WHATS APP OT GET DETAILS', '0-6 hour delivery', '60-day refill guarantee', 'No password required', 'Priority support'],
      popular: true,
    },
    {
      name: 'LIKES',
      price: 'Youtube Likes avaulable',
      quantity: '5,000 Subscribers',
      features: ['Dm in whats app to get details', '0-3 hour delivery', '90-day refill guarantee', 'No password required', 'Dedicated support', 'Bonus views'],
      popular: false,
    },
  ],
  tiktok: [
    {
      name: 'LIKES',
      price: ' likes available',
      quantity: 'Premium quality likes available',
      features: ['100 likes for rs 50', '500 likes for 135', '1000 likes for 175', '5000 likes for 250' , '10,000 likes for 460', '50,000 likes for 1000' , '100,000 likes for 1850'],
      popular: false,
    },
    {
      name: 'FOLLOWERS',
      price: 'Premium followers available',
      quantity: 'DM IN WHATS APP TO GET PRICE STARTING JUST AT 200',
      features: ['High-quality accounts', '0-3 hour delivery', '60-day refill guarantee', 'No password required', 'Priority support'],
      popular: true,
    },
    {
      name: 'Views',
      price: 'Premium Views available',
      quantity: 'Premium auality veiws available',
      features: ['1000 views  for Rs 70 ', '5000 views for Rs 200', '10,000 views for Rs 400', '50,000 views for Rs 700', 'Dedicated support', 'Bonus likes'],
      popular: false,
    },
  ],
  facebook: [
    {
      name: 'LIKES',
      price: ' DM IN WHATS APP TO GET  PRICE',
      quantity: 'DM IN WHATS APP TO GET  PRICE',
      features: ['High-quality accounts', '0-3 hour delivery', '60-day refill guarantee', 'No password required', 'Priority support '],
      popular: false,
    },
    {
      name: 'FOLLOWERS',
      price: 'DM IN WHATS APP TO GET  PRICE',
      quantity: 'DM IN WHATS APP TO GET PRICE ',
      features: ['High-quality accounts', '0-3 hour delivery', '60-day refill guarantee', 'No password required', 'Priority support'],
      popular: true,
    },
    {
      name: 'Views',
      price: 'DM IN WHATS APP TO GET  PRICE',
      quantity: 'DM IN WHATS APP TO GET THE PRICE',
      features: ['High-quality accounts', '0-3 hour delivery', '60-day refill guarantee', 'No password required', 'Priority support'],
      popular: false,
    },
  ],
};

function renderPricingCards(platform) {
  const container = document.getElementById('pricingCards');
  const data = pricingData[platform];

  container.innerHTML = data
    .map(
      (plan) => `
    <div class="pricing-card glass-card rounded-3xl p-6 sm:p-8 ${plan.popular ? 'popular' : ''}">
      ${plan.popular ? '<div class="popular-badge">Most Popular</div>' : ''}
      <h3 class="font-display font-bold text-xl mb-1">${plan.name}</h3>
      <p class="text-gray-400 text-sm mb-5">${plan.quantity}</p>
      <div class="mb-6">
        <span class="text-3xl sm:text-4xl font-display font-bold bg-gradient-to-r ${plan.popular ? 'from-neon-purple to-neon-blue' : 'from-white to-gray-300'} bg-clip-text text-transparent">${plan.price}</span>
      </div>
      <ul class="space-y-3 mb-8">
        ${plan.features
          .map(
            (f) => `
          <li class="flex items-center gap-3 text-sm text-gray-300">
            <i data-lucide="check" class="w-4 h-4 text-neon-green shrink-0"></i>
            ${f}
          </li>
        `
          )
          .join('')}
      </ul>
      <a href="#order" class="${plan.popular ? 'btn-primary' : 'btn-ghost'} w-full justify-center">
        <i data-lucide="shopping-cart" class="w-4 h-4"></i>
        Order Now
      </a>
    </div>
  `
    )
    .join('');

  lucide.createIcons();

  // Re-observe scroll animations for new elements
  container.querySelectorAll('.scroll-animate').forEach((el) => observer.observe(el));
}

// Initialize pricing
renderPricingCards('instagram');

// Pricing tab click
document.querySelectorAll('.pricing-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pricing-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    renderPricingCards(tab.dataset.platform);
  });
});

// ===== FAQ TOGGLE =====
document.querySelectorAll('[data-faq]').forEach((item) => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('[data-faq]').forEach((i) => i.classList.remove('active'));

    // Toggle current
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ===== ORDER FORM SUBMISSION =====
const orderForm = document.getElementById('orderForm');

orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(orderForm);
  const name = orderForm.querySelector('input[type="text"]').value;
  const phone = orderForm.querySelector('input[type="tel"]').value;
  const service = orderForm.querySelector('select').value;
  const link = orderForm.querySelector('input[type="url"]').value;
  const quantity = orderForm.querySelector('input[type="number"]').value;

  // Build WhatsApp message
  const message = `Hi! I'd like to place an order:\n\n👤 Name: ${name}\n📱 Phone: ${phone}\n🎯 Service: ${service}\n🔗 Link: ${link}\n📊 Quantity: ${quantity}`;

  const waUrl = `https://wa.me/9779843022602?text=${encodeURIComponent(message)}`;

  // Show toast
  showToast('Order Ready! 🚀', 'Redirecting to WhatsApp to confirm your order...');

  // Open WhatsApp after a short delay
  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 1000);

  orderForm.reset();
});

// ===== TOAST NOTIFICATION =====
function showToast(title, message) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');

  toastTitle.textContent = title;
  toastMessage.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

// ===== LIVE ORDER NOTIFICATION SIMULATION =====
const orderNotifications = [
  { name: 'Ramesh', service: '1K Instagram Followers', location: 'Kathmandu' },
  { name: 'Sita', service: 'Netflix Premium', location: 'Pokhara' },
  { name: 'Hari', service: '5K TikTok Views', location: 'Chitwan' },
  { name: 'Anita', service: 'YouTube Subscribers', location: 'Lalitpur' },
  { name: 'Bikash', service: 'Facebook Page Likes', location: 'Bhaktapur' },
  { name: 'Maya', service: 'Spotify Premium', location: 'Biratnagar' },
];

let notifIndex = 0;

function showOrderNotification() {
  const notif = orderNotifications[notifIndex % orderNotifications.length];
  showToast(`🛒 New Order from ${notif.location}`, `${notif.name} just ordered ${notif.service}`);
  notifIndex++;
}

// Show first notification after 8 seconds, then every 20 seconds
setTimeout(() => {
  showOrderNotification();
  setInterval(showOrderNotification, 25000);
}, 8000);
