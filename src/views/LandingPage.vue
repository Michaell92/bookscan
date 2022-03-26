<template>
  <div>
    <div id="top-nav">
      <div>
        <!-- Define search bar -->
        <input type="search" id="searchBar" placeholder="Search any book..." v-model="searchInput" />
        <!-- Define categories -->
        <div id="search-type" class="category">
          <h3>Search by:</h3>
          <button
            @click="changeSearchType('intitle')"
            :class="{ active: searchType === 'intitle' }"
          >Title</button>
          <button
            @click="changeSearchType('inauthor')"
            :class="{ active: searchType === 'inauthor' }"
          >Author</button>
          <button
            @click="changeSearchType('subject')"
            :class="{ active: searchType === 'subject' }"
          >Category</button>
        </div>
      </div>
      <!-- Add categories for filtering -->
      <div id="sort" class="category">
        <h3>Sort by:</h3>
        <button
          @click="sortBooks('relevance')"
          :class="{ active: searchOrder === 'relevance' }"
        >Most relevant</button>
        <button @click="sortBooks('newest')" :class="{ active: searchOrder === 'newest' }">Newest</button>
      </div>
    </div>
    <!-- Define progress bar -->
    <div class="progress-bar">
      <div :class="['bar', { 'bar-1': activeBar }]"></div>
      <div :class="['bar', { 'bar-2': activeBar }]"></div>
    </div>
    <main class="container">
      <!-- Pagination -->
      <div id="listPages">
        <div class="wrapper-arrow" @click="changeIndex()">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>
        </div>
        <div class="wrapper-arrow" @click="changeIndex('add')">
          <font-awesome-icon icon="arrow-right"></font-awesome-icon>
        </div>
      </div>
      <!-- List all books -->
      <div id="books">
        <book-resource
          v-for="book in allBooks"
          :key="book.id"
          :id="book.id"
          :title="book.volumeInfo.title"
          :authors="book.volumeInfo.authors"
          :image="imageLink(book.volumeInfo)"
          :categories="book.volumeInfo.categories"
          :averageRating="book.volumeInfo.averageRating"
          :ratingsCount="book.volumeInfo.ratingsCount"
          :preview="book.volumeInfo.previewLink"
        ></book-resource>
      </div>
    </main>
  </div>
</template>

<script>
import BookResource from "../components/BookResource.vue";
import { useBookStore } from '../stores/books';
import axios from 'axios';
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia'

export default {
  components: {
    BookResource,
  },
  setup() {
    // STORE
    const store = useBookStore()

    // DATA <<<<<<<>>>>>>>
    const { books: allBooks } = storeToRefs(store)
    const apiKey = store.apiKey
    const defaultApiKey = store.defaultApiKey
    const searchInput = ref('')
    const searchType = ref('intitle')
    const searchOrder = ref('relevance')
    const startIndex = ref(0)
    const activeBar = ref(false)

    // COMPUTED <<<<<
    //  Define search api
    const searchApi = computed(() => `https://www.googleapis.com/books/v1/volumes?q=${searchType.value}:${searchInput.value}&orderBy=${searchOrder.value}&startIndex=${startIndex.value}&key=${apiKey}`)


    // WATCH <<<<<>>>>>>>

    // Wait for input change and request new books
    watch(searchInput, (input) => {
      // Check if 1 seconds has elapsed since the last change
      setTimeout(() => {
        if (input === searchInput.value) {
          getBooks(searchApi.value);
        }
      }, 1000);
    })

    //  METHODS <<<<<<<>>>>>>>

    // Get books from the API
    async function getBooks(api) {

      try {
        // Start animation
        activeBar.value = true;

        // Fetch data
        const response = await axios.get(api);
        const books = response.data;

        // Add books to the store
        if (books.items.length > 0) {
          store.addBooks(books.items)
        }
        // End animation
        activeBar.value = false;
      } catch (err) {
        console.log(err);
      }
    }

    // Change search type
    const changeSearchType = function (type) {
      searchType.value = type;
      getBooks(searchApi.value);
    }

    // Change search order
    const sortBooks = function (order) {
      searchOrder.value = order;
      getBooks(searchApi.value);
    }

    // Change pagination Number
    const changeIndex = function (dir) {
      if (dir === "add") {
        startIndex.value = startIndex.value + 10;
      } else if (startIndex.value > 9) {
        startIndex.value = startIndex.value - 10;
      }

      getBooks(searchApi.value);
    }

    //     // Check if there is an image for the book
    const imageLink = function (link) {
      if (link.imageLinks) return link.imageLinks.thumbnail;
      return "";
    }

    // Get books before the page is loaded
    getBooks(defaultApiKey);

    return { allBooks, searchType, searchInput, searchOrder, activeBar, changeSearchType, sortBooks, changeIndex, imageLink }
  }
}

</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}

#books {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

#listPages {
  position: relative;
  margin-bottom: 30px;
  align-self: flex-end;
  margin-right: 250px;
}

.wrapper-arrow {
  position: relative;
  cursor: pointer;
  font-size: 20px;
}

.wrapper-arrow:hover svg {
  font-size: 22px;
}

#listPages div:first-child svg {
  margin-left: -25px;
}

.category {
  display: flex;
  align-items: center;
  /* align-self: flex-end; */
}

.category,
h3,
button {
  background-color: rgb(206, 239, 239);
  font-family: "Courier New", Courier, monospace;
}

.category h3 {
  margin-right: 15px;
}

.category button {
  margin-right: 10px;
  padding-bottom: 2px;
  font-size: 14px;
}

.active {
  border-bottom: 2px solid lightsalmon;
  margin-bottom: -2px;
}

#top-nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80px;
  background-color: rgb(206, 239, 239);
}

.progress-bar {
  background: blue;
  height: 5px;
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
  animation: start 0.3s ease-in;
}

.bar {
  position: absolute;
  background: lightblue;
  transition: transform 0.2s linear;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
}

.bar-1 {
  animation: growBar1 2.5s infinite, moveBar1 2.5s infinite;
}

.bar-2 {
  animation: growBar2 2.5s infinite, moveBar2 2.5s infinite;
}

@keyframes growBar1 {
  0% {
    animation-timing-function: linear;
    transform: scaleX(0.1);
  }
  36.6% {
    animation-timing-function: cubic-bezier(0.33473, 0.12482, 0.78584, 1);
    transform: scaleX(0.1);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.22573, 0, 0.23365, 1.37098);
    transform: scaleX(0.83);
  }
  100% {
    transform: scaleX(0.1);
  }
}

@keyframes moveBar1 {
  0% {
    left: -105.16667%;
    animation-timing-function: linear;
  }
  20% {
    left: -105.16667%;
    animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
  }
  69.15% {
    left: 21.5%;
    animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
  }
  100% {
    left: 95.44444%;
  }
}

@keyframes growBar2 {
  0% {
    animation-timing-function: cubic-bezier(0.20503, 0.05705, 0.57661, 0.45397);
    transform: scaleX(0.1);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.15231, 0.19643, 0.64837, 1.00432);
    transform: scaleX(0.57);
  }
  44.15% {
    animation-timing-function: cubic-bezier(
      0.25776,
      -0.00316,
      0.21176,
      1.38179
    );
    transform: scaleX(0.91);
  }
  100% {
    transform: scaleX(0.1);
  }
}

@keyframes moveBar2 {
  0% {
    left: -54.88889%;
    animation-timing-function: cubic-bezier(0.15, 0, 0.51506, 0.40968);
  }
  25% {
    left: -17.25%;
    animation-timing-function: cubic-bezier(0.31033, 0.28406, 0.8, 0.73372);
  }
  48.35% {
    left: 29.5%;
    animation-timing-function: cubic-bezier(0.4, 0.62703, 0.6, 0.90203);
  }
  100% {
    left: 117.38889%;
  }
}

@keyframes start {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 20px;
    opacity: 1;
  }
}

#top-nav div:first-child {
  display: flex;
}

#searchBar {
  border: 1px solid lightblue;
  border-radius: 3px;
  padding: 5px;
  height: 30px;
  width: 250px;
  outline: none;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
}

#searchBar:focus {
  outline: 2px solid lightblue;
}

#search-type {
  padding-left: 20px;
}

@media screen and (max-width: 950px) {
  #listPages {
    margin-right: 100px;
  }

  #top-nav {
    flex-direction: column;
    justify-content: center;
    height: 150px;
  }

  #top-nav div:first-child {
    flex-direction: column;
  }

  #searchBar {
    width: 100%;
  }

  #search-type {
    padding: 1rem 0;
  }

  #books {
    justify-content: center;
  }
}
</style>