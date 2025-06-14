<template>
  <div>
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="row align-items-center">
          <!-- Logo -->
          <div class="col-6 col-md-3">
            <NuxtLink to="/" class="logo"> ShopEnter </NuxtLink>
          </div>

          <!-- Search Bar (Desktop) -->
          <div class="col-md-6 d-none d-md-block">
            <div class="search-container">
              <input type="text" class="form-control search-bar" placeholder="Szukaj produktów..." v-model="searchQuery" />
              <button class="search-close" @click="clearSearch" v-if="searchQuery">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Desktop Icons -->
          <div class="col-3 d-none d-md-block text-end">
            <i class="fas fa-heart header-icons" title="Ulubione"></i>
            <i class="fas fa-user header-icons" title="Konto"></i>
          </div>

          <!-- Mobile Menu Button -->
          <div class="col-6 d-md-none text-end">
            <button class="mobile-menu-toggle" @click="toggleMobileMenu">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ active: mobileMenuOpen }">
      <!-- Header with back button, logo and search -->
      <div class="mobile-menu-header">
        <button class="mobile-menu-back" @click="closeMobileMenu">
          <i class="fas fa-arrow-left"></i>
        </button>

        <div class="logo">ShopEnter</div>

        <div class="mobile-menu-search">
          <input type="text" class="form-control search-bar" placeholder="Szukaj..." v-model="mobileSearchQuery" />
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav>
        <ul class="mobile-menu-nav">
          <li>
            <a href="#" @click="closeMobileMenu">
              <i class="fas fa-heart me-2"></i>
              Obserwowane ogłoszenia
            </a>
          </li>
          <li>
            <a href="#" @click="closeMobileMenu">
              <i class="fas fa-cog me-2"></i>
              Ustawienia
            </a>
          </li>
          <li>
            <a href="#" @click="closeMobileMenu">
              <i class="fas fa-user me-2"></i>
              Moje konto
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Categories -->
    <div class="category-container">
      <div class="container">
        <div class="category-chips">
          <a
            v-for="category in categories"
            :key="category.id"
            href="#"
            class="category-chip"
            :class="{ active: selectedCategory === category.slug }"
            @click.prevent="filterByCategory(category.slug)">
            {{ category.name }}
          </a>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="products-section">
      <div class="container">
        <!-- Page Title -->
        <div class="row mb-4">
          <div class="col-12">
            <h1 class="text-center mb-4" style="color: var(--text-dark)">Najnowsze Ogłoszenia</h1>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="product-grid">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card">
            <!-- Header with title, price, date and favorite -->
            <div class="product-header">
              <h5 class="product-title">{{ product.title }}</h5>
              <p class="product-price">{{ formatPrice(product.price) }} zł</p>
              <p class="product-date">{{ formatDate(product.date) }}</p>

              <button class="favorite-btn" :class="{ active: product.isFavorite }" @click="toggleFavorite(product.id)">
                <i class="fas fa-star"></i>
              </button>
            </div>

            <!-- Product Image/Placeholder -->
            <NuxtLink :to="`/product/${product.id}`" class="text-decoration-none">
              <div class="product-image">zdjęcie produktu</div>
            </NuxtLink>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="row mt-5">
          <div class="col-12 text-center">
            <button class="btn btn-outline-primary px-5 py-2" @click="loadMoreProducts">Załaduj więcej</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="row">
          <!-- First Column -->
          <div class="col-12 col-md-6">
            <div class="row">
              <div class="col-12">
                <h6>Informacje</h6>
                <a href="#">O nas</a>
                <a href="#">Dlaczego warto używać ShopEnter?</a>
                <a href="#">Jak działamy?</a>
                <a href="#">Reklamy</a>
              </div>
            </div>
          </div>

          <!-- Second Column -->
          <div class="col-12 col-md-6">
            <div class="row">
              <div class="col-12">
                <h6>Pomoc i Bezpieczeństwo</h6>
                <a href="#">Pomoc techniczna</a>
                <a href="#">Zasady bezpieczeństwa</a>
                <a href="#">Polityka Cookies</a>
                <a href="#">Polityka prywatności</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="row mt-4 pt-4" style="border-top: 1px solid rgba(255, 255, 255, 0.2)">
          <div class="col-12 text-center">
            <small>&copy; 2025 ShopEnter. Wszystkie prawa zastrzeżone.</small>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// SEO Meta
useHead({
  title: "ShopEnter - Najnowsze Ogłoszenia",
  meta: [{ name: "description", content: "Przeglądaj najnowsze ogłoszenia na ShopEnter. Znajdź to, czego szukasz!" }],
});

// Reactive data
const searchQuery = ref("");
const mobileSearchQuery = ref("");
const mobileMenuOpen = ref(false);
const selectedCategory = ref("");

// Categories
const categories = ref([
  { id: 1, name: "Elektronika", slug: "elektronika" },
  { id: 2, name: "Moda", slug: "moda" },
  { id: 3, name: "Dom i Ogród", slug: "dom-ogrod" },
  { id: 4, name: "Motoryzacja", slug: "motoryzacja" },
  { id: 5, name: "Sport", slug: "sport" },
  { id: 6, name: "Kultura", slug: "kultura" },
  { id: 7, name: "Zwierzęta", slug: "zwierzeta" },
  { id: 8, name: "Dla dzieci", slug: "dla-dzieci" },
  { id: 9, name: "Nieruchomości", slug: "nieruchomosci" },
  { id: 10, name: "Praca", slug: "praca" },
]);

// Sample products data
const products = ref([
  {
    id: 1,
    title: "iPhone 14 Pro",
    price: 4500,
    date: "2025-06-10",
    category: "elektronika",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Kurtka zimowa",
    price: 250,
    date: "2025-06-10",
    category: "moda",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Laptop Dell",
    price: 2800,
    date: "2025-06-09",
    category: "elektronika",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Rower górski",
    price: 1200,
    date: "2025-06-09",
    category: "sport",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Sofa 3-osobowa",
    price: 800,
    date: "2025-06-08",
    category: "dom-ogrod",
    isFavorite: false,
  },
  {
    id: 6,
    title: "PlayStation 5",
    price: 2200,
    date: "2025-06-08",
    category: "elektronika",
    isFavorite: false,
  },
  {
    id: 7,
    title: "Sukienka wieczorowa",
    price: 180,
    date: "2025-06-07",
    category: "moda",
    isFavorite: false,
  },
  {
    id: 8,
    title: "Samochód Opel Astra",
    price: 35000,
    date: "2025-06-07",
    category: "motoryzacja",
    isFavorite: false,
  },
  {
    id: 9,
    title: "Książka kucharska",
    price: 45,
    date: "2025-06-06",
    category: "kultura",
    isFavorite: false,
  },
  {
    id: 10,
    title: "Smartwatch",
    price: 320,
    date: "2025-06-06",
    category: "elektronika",
    isFavorite: false,
  },
  {
    id: 11,
    title: "Buty sportowe Nike",
    price: 280,
    date: "2025-06-05",
    category: "sport",
    isFavorite: false,
  },
  {
    id: 12,
    title: "Mieszkanie 2-pokojowe",
    price: 450000,
    date: "2025-06-05",
    category: "nieruchomosci",
    isFavorite: false,
  },
]);

// Computed properties
const filteredProducts = computed(() => {
  let filtered = products.value;

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter((product) => product.category === selectedCategory.value);
  }

  // Filter by search query
  const query = searchQuery.value || mobileSearchQuery.value;
  if (query) {
    filtered = filtered.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
  }

  return filtered;
});

// Methods
const clearSearch = () => {
  searchQuery.value = "";
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const filterByCategory = (categorySlug) => {
  selectedCategory.value = selectedCategory.value === categorySlug ? "" : categorySlug;
};

const toggleFavorite = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  if (product) {
    product.isFavorite = !product.isFavorite;
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("pl-PL").format(price);
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

const loadMoreProducts = () => {
  // In real app, this would fetch more products from API
  console.log("Loading more products...");
};
</script>
