<template>
  <main>
    <header-comp />

    <router-view class="cointainer px-5 sm:px-20 py-20 flex justify-center" />
  </main>
</template>

<script>
import headerComp from "@/components/headerComp";

export default {
  name: "App",
  components: {
    headerComp
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
