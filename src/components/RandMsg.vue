<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
    messages: string[]
}>()

const selected = ref("loading...")
onMounted(() => {
    const idx = Math.floor(Math.random() * props.messages.length)
    selected.value = props.messages[idx] ?? ""
})
</script>

<template>
    <span>{{ selected }}</span>
</template>