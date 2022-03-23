<template>
  <div class="container">
    <div id="main">
      <div id="main-left">
        <h2>{{ book.title }}</h2>
        <img :src="imageLink" :alt="book.title" />
      </div>
      <div id="main-right" v-html="book.description"></div>
    </div>
    <div id="info">
      <div id="rating" class="card">
        <div v-if="ratingFloor > 0" class="rating font-s">
          <span class="span-lead">Average rating:</span>
          <a :href="reviewLink" target="_blank" class="stars">
            <!-- Check if there is any rating -->
            <div>
              <!-- Display stars -->
              <font-awesome-icon v-for="n in ratingFloor" :key="n" icon="star"></font-awesome-icon>
            </div>
            <!-- Check and display half star -->
            <font-awesome-icon
              v-if="book.averageRating > ratingFloor"
              icon="star-half-alt"
              style="margin-top: -1px"
            ></font-awesome-icon>
          </a>
          <a :href="reviewLink" target="_blank" id="ratingNumber">
            {{
              book.ratingsCount
            }}
          </a>
        </div>
        <span v-else class="font-s alt-rating">No reviews</span>
      </div>
      <div id="reviewLink" class="card">
        <span class="spanLead">Google review:</span>
        <a :href="reviewLink" target="_blank">{{ reviewLink }}</a>
      </div>
      <div id="author" class="card">
        <span class="spanLead">Author:</span>
        <span>{{ authorsFinal }}</span>
      </div>
      <div id="categories" class="card">
        <span class="spanLead">Categories:</span>
        <span>{{ categoriesFinal }}</span>
      </div>
      <div id="dimensions" class="card">
        <span class="spanLead">Dimensions:</span>
        <span>{{ dimensions }}</span>
      </div>
      <div id="language" class="card">
        <span class="spanLead">Language:</span>
        <span>{{ book.language }}</span>
      </div>
      <div id="pageCount" class="card">
        <span class="spanLead">Page Count:</span>
        <span>{{ book.pageCount }}</span>
      </div>
      <div id="publishedDate" class="card">
        <span class="spanLead">Published date:</span>
        <span>{{ book.publishedDate }}</span>
      </div>
      <div id="publisher" class="card">
        <span class="spanLead">Publisher:</span>
        <span>{{ book.publisher }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBookStore } from '../stores/books';

export default {
  setup() {
    const store = useBookStore()
    const route = useRoute()

    // Api info
    const book = reactive({})

    // COMPUTED
    // Book details
    const apiKey = computed(() => store.apiKey)
    const bookApi = computed(() => `https://www.googleapis.com/books/v1/volumes/${route.params.id}?key=${apiKey.value}`)
    const categoriesFinal = computed(() => {
      if (book.categories) return book.categories.join(", ");
      return "";
    })
    const authorsFinal = computed(() => {
      if (book.authors) return book.authors.join(", ");
      return "";
    })
    const ratingFloor = computed(() => Math.floor(book.averageRating))
    const reviewLink = computed(() => `https://books.google.com/books?id=${route.params.id}&sitesec=reviews`)
    const imageLink = computed(() => {
      if (book.imageLinks) return book.imageLinks.thumbnail;
      return "";
    })
    const dimensions = computed(() => {
      let dimensions = [];
      if (book.dimensions) {
        for (const prop in book.dimensions) {
          dimensions.push(`${prop}: ${book.dimensions[prop]}`);
        }
      }
      return dimensions.join(", ");
    })

    // METHODS
    // Get book data
    async function getBookData() {
      try {
        const response = await fetch(bookApi.value);
        const data = await response.json();

        Object.assign(book, data.volumeInfo)
      } catch (err) {
        console.log(err);
      }
    }

    getBookData();

    return { categoriesFinal, ratingFloor, authorsFinal, reviewLink, imageLink, dimensions, book }
  }
}
</script>

<style scoped>
#main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;
}

#main-left {
  margin-right: 80px;
  padding: 10px;
  border: 2px solid lightblue;
}

h2 {
  /* text-align: center; */
  color: darkblue;
  margin-bottom: 10px;
}

.rating {
  align-self: flex-end;
  display: flex;
}

.alt-rating {
  align-self: flex-end;
}

.font-s {
  font-size: 12px;
}

.stars {
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  border: 1px solid lightblue;
  padding: 5px;
  margin: 5px;
}

#reviewLink a {
  color: blue;
  border-bottom: 1px solid blue;
  padding-bottom: 2px;
  cursor: pointer;
}
</style>