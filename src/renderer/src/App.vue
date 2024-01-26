<template>

  <div id="nav">
    <router-link to="/">Tarefas</router-link> -
    <router-link to="/concluidos">Tarefas Concluídas</router-link> -
    <router-link to="/calendario">Calendário</router-link>
  </div>

  <router-view/>

  <div id="rodape">
    Rodapé
  </div>
</template>

<script>

</script>

<style lang="css">
#app {
  text-align: center;
  color: #F5E8C7;
  margin: 50px auto;
  background-color: #363062;
}

#nav {
  padding: 8px 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: #111a23;

  a {
    color: #F5E8C7;
    text-decoration: none;
    background-color: transparent;

    &.router-link-exact-active {
      color: #f59e0b;
    }
  }
}

#rodape {
  padding: 8px 0;
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: #111a23;
  color: #f59e0b;

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
