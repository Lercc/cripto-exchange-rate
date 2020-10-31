<template>
  <div class="flex flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="!isLoading && asset.id">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="changeTypeConvert"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ fromUSD ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="valueToChange"
                id="convertValue"
                type="number"
                :placeholder="
                  fromUSD ? `Valor en USD` : `Valor en ${asset.symbol}`
                "
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl">
            {{ exchangeValueConverter }} {{ fromUSD ? asset.symbol : "USD" }}
          </span>
        </div>
      </div>

      <line-chart
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
        class="my-5"
      />

      <h3 class="text-xl my-10">Mejores ofertas de Cambio</h3>
      <table>
        <tr
          v-for="m in markets"
          :key="`${m.exhangeId}-${m.priceUsd}`"
          class="border-b"
        >
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ m.priceUsd | dollar }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <boton-comp
              :is-loading="m.isLoading || false"
              v-if="!m.url"
              @clickeo-component="getWebSite(m)"
            >
              <span v-show="!m.isLoading">Obtener Link</span>
            </boton-comp>
            <a
              v-else
              class="hover:underline text-green-600 cursor-pointer"
              target="_blank"
              :href="m.url"
              >{{ m.url }}</a
            >
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from "@/api";
import botonComp from "@/components/botonComp";

export default {
  name: "coinDetail",

  components: {
    botonComp
  },

  data() {
    return {
      asset: {},
      history: [],
      markets: [],
      isLoading: false,
      isWebLoading: false,
      fromUSD: true,
      valueToChange: ""
    };
  },

  computed: {
    exchangeValueConverter() {
      if (!this.valueToChange) {
        return 0;
      }

      return (this.fromUSD
        ? this.valueToChange / this.asset.priceUsd
        : this.valueToChange * this.asset.priceUsd
      ).toFixed(3);
      // return out.toFixed(3)
    },

    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    avg() {
      return (
        this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) /
        this.history.length
      );
    }
  },

  watch: {
    $route() {
      this.getCoin();
    }
  },

  created() {
    this.getCoin();
  },

  methods: {
    changeTypeConvert() {
      this.fromUSD = !this.fromUSD;
    },

    getWebSite(exchange) {
      this.$set(exchange, "isLoading", true);

      return api
        .getExchange(exchange.exchangeId)
        .then(res => {
          this.$set(exchange, "url", res.exchangeUrl);
        })
        .finally(() => {
          exchange.isLoading = false;
        });
    },

    getCoin() {
      this.isLoading = true;

      //traer el dato id que se encuentra en los parametos de la url
      //se usa el $route para ir a los datos de la ruta
      const id = this.$route.params.id;

      //Promise all pertime hacer un llamado a multiples promises atravez  de un array
      // y poder manejar las respuestas cuando estas hallan terminado

      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id)
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
