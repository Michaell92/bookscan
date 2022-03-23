<template>
  <div class="wrapper" @mouseover="hoverActive = true" @mouseleave="hoverActive = false">
    <div class="main-card" :id="id">
      <!-- Rating and stars -->
      <div v-if="ratingFloor > 0" class="rating font-s">
        <a :href="reviewLink" target="_blank" class="stars">
          <!-- Check if there is any rating -->
          <div>
            <!-- Display stars -->
            <font-awesome-icon v-for="n in ratingFloor" :key="n" icon="star"></font-awesome-icon>
          </div>
          <!-- Check and display half star -->
          <font-awesome-icon
            v-if="averageRating > ratingFloor"
            icon="star-half-alt"
            style="margin-top: -1px"
          ></font-awesome-icon>
        </a>
        <a :href="reviewLink" target="_blank" id="ratingNumber">
          {{
            ratingsCount
          }}
        </a>
      </div>
      <span v-else class="font-s alt-rating">No reviews</span>
      <div id="info">
        <router-link :to="id">
          <h4 class="title">{{ title }}</h4>
        </router-link>
        <router-link :to="id">
          <img v-if="image.length > 1" :src="image" :alt="title" />
        </router-link>
      </div>
      <div class="bottom" v-if="categoriesFinal || authorsFinal">
        <span>{{ categoriesFinal }}</span>
        <span>{{ authorsFinal }}</span>
      </div>
      <div v-else>No info</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: Array,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
    averageRating: {
      type: Number,
      required: false,
    },
    ratingsCount: {
      type: Number,
      required: false,
    },
    preview: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const hoverActive = ref(false)

    const categoriesFinal = computed(() => {
      if (props.categories) return props.categories.join(", ");
      return "";
    })
    const authorsFinal = computed(() => {
      if (props.authors) return props.authors.join(", ");
      return "";
    })
    const ratingFloor = computed(() => Math.floor(props.averageRating))
    const reviewLink = computed(() => `https://books.google.com/books?id=${props.id}&sitesec=reviews`)

    return { hoverActive, categoriesFinal, authorsFinal, ratingFloor, reviewLink }
  }
};
</script>

<style scoped>
* {
  background-color: aliceblue;
}

.wrapper {
  position: relative;
  width: 190px;
  height: 370px;
  margin: 20px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
}

.wrapper:hover .main-card {
  width: 195px;
  height: 375px;
  z-index: 1;
  transition: width 0.1s ease-in, height 0.1s ease-in;
}

#info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

#info h4 {
  margin-bottom: 15px;
  text-align: center;
  color: darkblue;
}

.bottom {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  /* align-items: center; */
}

.bottom span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  padding: 3px;
  background-color: rgb(205, 236, 246);
  /* border: 1px solid transparent; */
  border-radius: 5px;
}

.bottom span:first-child {
  margin-bottom: 5px;
  /* width: 170px; */
}

/* .title {
  padding: 10px;
} */

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

.stars svg path {
  color: red;
}

#ratingNumber {
  text-decoration: underline;
}

.title {
  margin: 10px 0;
}

#books .card .addToCartButton {
  font-size: 15px;
}

.addToCartButton:hover svg {
  font-size: 16px;
}

.overflowVisible {
  overflow: visible;
}
</style>