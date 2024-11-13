<template>
    <div class="container-fluid h-80">
      <div id="carouselExampleDark " class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
      <img src="https://images.pexels.com/photos/5849565/pexels-photo-5849565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Gestion De Depenses</h5>
        <!-- <p>Some representative placeholder content for the first slide.</p> -->
        <RouterLink to="/dashboard" class="btn btn-info">Découvrir</RouterLink>
      </div>
    
  </div>
  </div>
  
</div>  
    </div>
    
</template>
<script setup></script>
<style scoped>
.carousel-item {
    height: 100vh;
}

.carousel-item .carousel-caption{
    padding: 20px;
    /* background-color: rgba(0, 0, 139, 0.642); */
}
</style>