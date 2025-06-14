<template>
  <div class="mobile-menu" :class="{ active: isOpen }">
    <!-- Header with back button, logo and search -->
    <div class="mobile-menu-header">
      <button class="mobile-menu-back" @click="$emit('close')">
        <i class="fas fa-arrow-left"></i>
      </button>

      <div class="logo">ShopEnter</div>

      <div class="mobile-menu-search">
        <input type="text" class="form-control search-bar" placeholder="Szukaj..." v-model="searchQuery" />
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav>
      <ul class="mobile-menu-nav">
        <li>
          <NuxtLink to="/favorites" @click="$emit('close')">
            <i class="fas fa-heart me-2"></i>
            Obserwowane ogłoszenia
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/settings" @click="$emit('close')">
            <i class="fas fa-cog me-2"></i>
            Ustawienia
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/account" @click="$emit('close')">
            <i class="fas fa-user me-2"></i>
            Moje konto
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close"]);

const searchQuery = ref("");
</script>
