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
@import "./fonts/font.css";
html,
body {
  min-height: 100%;
  background-image: url("./assets/bg.jpg");
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
.STLiBian {
  font-family: STLiBian;
}
.Trends {
  font-family: Trends;
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
  font-family: STLiBian;
  font-size: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-top: 1em;
  color: whitesmoke;
  border-radius: 8px;
  min-width: 300px;
  border: 2px solid #999999;
  padding: 27px 0;
  background: linear-gradient(#cacaca, #bababa);
  transition: all 1.5s;
  &.isValidated {
    background: linear-gradient(#e8c343, #d5b030);
  }
  img {
    height: 27px;
  }
}
.pageContainer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .btns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    &.btns_row {
      .btn {
        width: 300px;
        &:first-child {
          margin-right: 11px;
        }
        &:last-child {
          margin-left: 11px;
        }
      }
    }
  }

  .pageContent {
    flex: 1;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
  }
  .btns {
    margin: 1em 0 2em;
  }
}

.inputArea {
  border-radius: 15px;
  border: 5px solid #435f84;
  background: white;
  position: relative;
  padding: 0.5em 0em;
  width: 500px;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  input {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 48px;
    border: 0;
    text-align: center;
    outline: none;
    &::placeholder {
      font-family: STLibian;
      font-size: 48px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #c1c1c1;
    }
  }
  .ok {
    position: absolute;
    width: 56px;
    height: 56px;
    background-image: url("./components/images/status_ok.png");
    background-size: 100% 100%;
    right: 17px;
    top: 50%;
    transform: translateY(-50%);
    // z-index: -1;
  }
}
</style>
