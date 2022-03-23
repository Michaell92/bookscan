import { defineStore } from "pinia";

export const useBookStore = defineStore("books", {
  state() {
    return {
      books: [],
      apiKey: "AIzaSyDiFVnnht3SMzWQc0GZxC7GC8rY5EzSbag",
    };
  },
  actions: {
    addBooks(data) {
      this.books = [...data];
    },
  },
  getters: {
    defaultApiKey: (state) =>
      `https://www.googleapis.com/books/v1/volumes?q=intitle:&key=${state.apiKey}`,
  },
});
