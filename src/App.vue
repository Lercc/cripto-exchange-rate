<template>
  <main>
    <header-comp :links="links" />

    <router-view class="container px-5 sm:px-20 py-20 flex justify-center" />
  </main>
</template>

<script>
import headerComp from "@/components/headerComp";

export default {
  name: "App",

  components: {
    headerComp
  },

  data () {
    return {
      links: [
        {
          name: 'BTC',
          url: { name: 'coin-detail', params: { id: 'bitcoin' } }
        },
        {
          name: 'ETH',
          url: { name: 'coin-detail', params: { id: 'ethereum' } }
        },
        {
          name: 'XRP',
          url: { name: 'coin-detail', params: { id: 'ripple' } }
        }
      ]
    }
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
