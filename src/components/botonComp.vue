<template>
    <button @click="buttonClick"
    class="bg-transparent text-green-600 hover:bg-green-500  font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded">
        <beat-loader :loading="isLoading" :color="'#68d391'" :size="8" />
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'botonComp',

    props: {
        isLoading: {
            type: Boolean,
            default: false,
        }
    },

    methods: {
        buttonClick () {
            this.$emit('clickeo-component')
        }
    }
}
</script>