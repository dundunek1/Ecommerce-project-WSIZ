<template>
  <div class="product-card">
    <!-- Header with title, price, date and favorite -->
    <div class="product-header">
      <h5 class="product-title">{{ product.title }}</h5>
      <p class="product-price">{{ formatPrice(product.price) }} zł</p>
      <p class="product-date">{{ formatDate(product.date) }}</p>

      <button class="favorite-btn" :class="{ active: isFavorite }" @click="toggleFavorite">
        <i class="fas fa-star"></i>
      </button>
    </div>

    <!-- Product Image/Placeholder -->
    <NuxtLink :to="`/product/${product.id}`" class="text-decoration-none">
      <div class="product-image">zdjęcie produktu</div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const isFavorite = ref(false);

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
</script>
