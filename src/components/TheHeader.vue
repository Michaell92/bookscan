<template>
  <div class="container">
    <header>
      <nav>
        <router-link to="/">
          <div id="logo">
            <img src="../assets/logo.svg" alt="bookscan" />
            <h1 class="nav-text">Bookscan</h1>
          </div>
        </router-link>

        <a class="nav-text" href="https://github.com/Michaell92/bookscan" target="_blank">Github</a>
      </nav>
    </header>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
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
.nav-text {
  /* background: rgb(26, 48, 48); */
  color: rgb(74, 58, 124);
  font-size: 1.7rem;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>