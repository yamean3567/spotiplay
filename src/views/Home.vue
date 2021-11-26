<template>
  <h3>Hej</h3>
  <router-link :to="{ name: 'Game1'}">Game1 </router-link>
  <router-link :to="{ name: 'Game2'}">Game2 </router-link>
  <router-link :to="{ name: 'Game3'}">Game3</router-link>
</template>

<script>
export default {
    name: 'Home',
}
</script>

<style>
</style>