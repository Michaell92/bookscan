<template>
  <div>
    <the-header></the-header>
    <!-- <router-link to="/">go</router-link> -->
    <router-view />
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { useBookStore } from "./stores/books.js"

export default {
  components: { TheHeader, TheFooter },

  setup() {
    const store = useBookStore();
    console.log(store)
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Source Sans Pro;
  color: #0d0825;
  background-color: rgb(238, 243, 247);
}

.main-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 20px 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.fa-star path,
.fa-star-half-alt path {
  color: gold;
}

#listPages svg {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: all 0.1s ease-in;
}

#listPages svg path {
  color: lightblue;
}

#listPages svg:hover path {
  color: blue;
}

.container {
  max-width: 1400px;
  margin: auto;
  padding: 50px;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
}

#info {
  font-size: 1.1rem;
}

#info div span:nth-child(2) {
  color: rgb(97, 97, 161);
}

.spanLead {
  margin-right: 0.5rem;
}
</style>
