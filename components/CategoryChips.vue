<template>
  <div class="category-container">
    <div class="container">
      <div class="category-chips">
        <NuxtLink v-for="category in categories" :key="category.id" :to="`/category/${category.slug}`" class="category-chip">
          {{ category.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
</script>
