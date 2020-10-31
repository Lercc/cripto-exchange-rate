<template>
  <header class="shadow w-full cuack">
    <nav>
      <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <iconComp class="mr-4" />
          <router-link to="/" class="font-semibold text-xl tracking-tight">
            PlatziExchange
          </router-link>
        </div>

        <div class="hidden w-full flex-grow md:flex md:items-center md:w-auto">
          <div class="text-sm lg:flex-grow">
            <router-link
              v-for="l in links"
              :key="l.name"
              :to="l.url"
              class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
            >
              {{ l.name }}
            </router-link>
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import iconComp from "@/components/iconComp";

export default {
  name: "headerComp",

  components: {
    iconComp
  },

  props: {
    links: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.cuack {
  /* outline:1px solid red; */
}</style
>>
