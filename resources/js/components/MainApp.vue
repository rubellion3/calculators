<template>
    <div class="main">
        <!-- <router-link :to="{ path: '/about' }">About</router-link>
        <router-link :to="{ path: '/contact' }">Contact</router-link>
        <router-link :to="{ path: '/' }">Home</router-link> -->
        <Header/>
        <router-view />
    </div>
</template>

<script>
import Header from "./layouts/Header";
export default {
    components: {
        Header,
    },
};
</script>

<style></style>
