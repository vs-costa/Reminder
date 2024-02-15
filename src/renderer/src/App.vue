<template>
  <div class="app">

    <div class="nav">
      <router-link to="/">Tarefas</router-link> -
      <router-link to="/concluidos">Tarefas Concluídas</router-link> -
      <router-link to="/calendario">Calendário</router-link>
    </div>

    <router-view />

    <div class="rodape">
      <p>Desenvolvido por <a href="https://github.com/vs-costa" target="_blank" rel="noopener noreferrer">Victor Soares
          | Reminder </a> &copy; 2024</p>
    </div>
  </div>
</template>


<style scoped lang="css">
.app {
  text-align: center;
  color: #F5E8C7;
  margin: 50px auto;
}

.nav,
.rodape {
  padding: 8px 0;
  position: fixed;
  width: 100%;
  text-align: center;
  background-color: #111a23;
}

.nav {
  top: 0;
  z-index: 998;

  a {
    color: #F5E8C7;
    text-decoration: none;
    background-color: transparent;

    &.router-link-exact-active {
      color: #f59e0b;
      background-color: transparent;
    }
  }
}

.rodape {
  bottom: 0;
  color: #f59e0b;
  z-index: 999;

  p {
    background-color: transparent;
  }

  a {
    color: #F5E8C7;
    text-decoration: none;
    background-color: transparent;

    &:hover {
      text-decoration: underline;
    }
  }

}

.content {
  margin-top: 40px;
  margin-bottom: 40px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  display: flex;
  justify-content: center;
}
</style>
