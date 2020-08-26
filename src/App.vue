<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  min-height: 100%;
  background-image: url("/images/bg.jpg");
  background-repeat: repeat-y;
  background-size: 100% auto;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  font-size: 16px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.btn {
  margin-top: 1em;
  color: whitesmoke;
  border-radius: 0.4em;
  border: 1px solid #999999;
  font-size: 1.24em;
  padding: 0.58em 1.5em;
  background: linear-gradient(#cacaca, #bababa);
  transition: all 1.5s;
  &.isValidated {
    background: linear-gradient(#e8c343, #d5b030);
  }
}

.pageContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .btns {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .pageContent{
    flex: 1;
  }
  .btns{
    margin: 1em 0 2em;
  }
}
</style>
