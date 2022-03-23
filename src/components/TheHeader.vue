<template>
  <div class="container">
    <header>
      <nav>
        <router-link to="/">
          <div id="logo">
            <img src="../assets/logo.svg" alt="bookscan" />
            <h1>Bookscan</h1>
          </div></router-link
        >
      </nav>
    </header>
  </div>
</template>

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(77, 131, 149);
  font-size: 30px;
}

img {
  width: 50px;
  margin-right: 10px;
}

#logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 220px;
}
</style>