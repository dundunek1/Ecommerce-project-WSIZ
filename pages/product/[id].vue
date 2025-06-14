<template>
  <div class="container">
    <div v-if="product" class="product-detail-card">
      <!-- Product Image -->
      <div class="product-detail-image">zdjęcie produktu</div>

      <!-- Product Details -->
      <div class="product-detail-content">
        <button class="favorite-btn" :class="{ active: isFavorite }" @click="toggleFavorite">
          <i class="fas fa-star"></i>
        </button>

        <h1 class="product-detail-title">{{ product.title }}</h1>
        <p class="product-detail-price">{{ formatPrice(product.price) }} zł</p>

        <div class="row mb-4">
          <div class="col-md-6">
            <p><strong>Kategoria:</strong> {{ product.category }}</p>
            <p><strong>Data dodania:</strong> {{ formatDate(product.date) }}</p>
            <p><strong>Lokalizacja:</strong> {{ product.location }}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Stan:</strong> {{ product.condition }}</p>
            <p><strong>Sprzedający:</strong> {{ product.seller }}</p>
          </div>
        </div>

        <div class="product-detail-description">
          <h5>Opis</h5>
          <p>{{ product.description }}</p>
        </div>

        <!-- Contact Buttons -->
        <div class="row mt-4">
          <div class="col-md-6 mb-3">
            <button class="btn btn-primary w-100 py-3">
              <i class="fas fa-phone me-2"></i>
              Zadzwoń: {{ product.phone }}
            </button>
          </div>
          <div class="col-md-6 mb-3">
            <button class="btn btn-outline-primary w-100 py-3">
              <i class="fas fa-envelope me-2"></i>
              Wyślij wiadomość
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Ładowanie...</span>
      </div>
    </div>

    <!-- Similar Products -->
    <div class="mt-5">
      <h3 class="mb-4">Podobne ogłoszenia</h3>
      <div class="product-grid">
        <ProductCard v-for="similarProduct in similarProducts" :key="similarProduct.id" :product="similarProduct" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const product = ref(null);
const isFavorite = ref(false);
const loading = ref(true);

// Sample product data - in real app this would come from API
const allProducts = {
  1: {
    id: 1,
    title: "iPhone 14 Pro",
    price: 4500,
    date: "2025-06-10",
    category: "Elektronika",
    location: "Warszawa",
    condition: "Bardzo dobry",
    seller: "Jan Kowalski",
    phone: "+48 123 456 789",
    description:
      "Sprzedam iPhone 14 Pro w bardzo dobrym stanie. Telefon był używany przez 6 miesięcy, zawsze w etui i z folią ochronną. W zestawie oryginalne pudełko, kabel i instrukcja. Telefon nie był naprawiany, bateria w bardzo dobrym stanie - 95% pojemności. Możliwość sprawdzenia przed zakupem. Preferuję odbiór osobisty w Warszawie, ale możliwa także wysyłka za pobraniem.",
  },
  2: {
    id: 2,
    title: "Kurtka zimowa",
    price: 250,
    date: "2025-06-10",
    category: "Moda",
    location: "Kraków",
    condition: "Nowy",
    seller: "Anna Nowak",
    phone: "+48 987 654 321",
    description:
      "Nowa kurtka zimowa damska, rozmiar M. Kupiona w tym sezonie, nigdy nie noszona - nie pasuje rozmiar. Bardzo ciepła, wodoodporna, idealna na zimę. Marka znana z wysokiej jakości produktów. Cena w sklepie wynosiła 400 zł. Sprzedam za 250 zł. Możliwość przymierzenia przed zakupem.",
  },
};

const similarProducts = ref([
  {
    id: 3,
    title: "iPhone 13 Pro",
    price: 3800,
    date: "2025-06-09",
    category: "Elektronika",
  },
  {
    id: 4,
    title: "Samsung Galaxy S23",
    price: 3200,
    date: "2025-06-08",
    category: "Elektronika",
  },
  {
    id: 5,
    title: "iPad Air",
    price: 2100,
    date: "2025-06-07",
    category: "Elektronika",
  },
]);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
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

// Load product data
onMounted(() => {
  const productId = route.params.id;

  // Simulate API call
  setTimeout(() => {
    product.value = allProducts[productId];
    loading.value = false;

    if (!product.value) {
      // Product not found, redirect to 404 or home
      router.push("/");
    }
  }, 500);
});

// SEO Meta
useHead(() => ({
  title: product.value ? `${product.value.title} - ShopEnter` : "Ładowanie... - ShopEnter",
  meta: [
    {
      name: "description",
      content: product.value ? product.value.description.substring(0, 160) + "..." : "Szczegóły produktu na ShopEnter",
    },
  ],
}));
</script>
