<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <!-- First Column -->
        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-12">
              <h6>Informacje</h6>
              <NuxtLink to="/about">O nas</NuxtLink>
              <NuxtLink to="/why-use">Dlaczego warto używać ShopEnter?</NuxtLink>
              <NuxtLink to="/how-it-works">Jak działamy?</NuxtLink>
              <NuxtLink to="/ads">Reklamy</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Second Column -->
        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-12">
              <h6>Pomoc i Bezpieczeństwo</h6>
              <NuxtLink to="/support">Pomoc techniczna</NuxtLink>
              <NuxtLink to="/security">Zasady bezpieczeństwa</NuxtLink>
              <NuxtLink to="/cookies">Polityka Cookies</NuxtLink>
              <NuxtLink to="/privacy">Polityka prywatności</NuxtLink>
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
</template>

<script setup>
// Footer component logic if needed
</script>
