<template>
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
          <button class="mobile-menu-toggle" @click="openMenu">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, inject } from "vue";

const searchQuery = ref("");
const openMobileMenu = inject("openMobileMenu");

const clearSearch = () => {
  searchQuery.value = "";
};

const openMenu = () => {
  openMobileMenu();
};
</script>
