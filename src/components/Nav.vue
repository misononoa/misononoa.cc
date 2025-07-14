<script setup lang="ts">
import { computed, ref } from 'vue';

export type NavLink = {
    href: string;
    name: string;
};

const props = defineProps<{
    current?: string;
    links: NavLink[];
}>()

const links = props.links.filter((l) => {
    return !!props.current
        ? l.name !== props.current.toLowerCase()
        : true;
})
const top = links.shift()

const isOpen = ref(false)
function toggle() {
    isOpen.value = !isOpen.value
}
const btnStr = computed(() => isOpen.value ? "-" : "+")
</script>

<template>
    <nav>
        <span className="toggleButton" @click="toggle">
            {{ btnStr }}
        </span>
        <a :href="top?.href">
            {{ top?.href === "/" ? "TOP" : top?.name.toUpperCase() }}
        </a>
        <a v-if="isOpen" v-for="l in links" :href="l.href">
            {{ l.name.toUpperCase() }}
        </a>
    </nav>
</template>

<style>
nav {
    height: 32px;
    display: flex;
    justify-content: left;
    overflow-x: scroll;
    scrollbar-width: none;
}

nav::-webkit-scrollbar {
    display: none;
}

nav * {
    margin: 0 10px;
    font-size: 110%;
    font-weight: bold;
}

nav .toggleButton {
    cursor: pointer;
    color: black;
}
</style>