<template>
  <assets-table :assets="assets" />
</template>

<script>
import api from "@/api";
import assetsTable from "@/components/assetsTable";

export default {
  name: "home",

  components: {
    assetsTable
  },

  data() {
    return {
      assets: []
    };
  },

  created() {
    api.getAssets().then(assets => (this.assets = assets));
  }
};
</script>
