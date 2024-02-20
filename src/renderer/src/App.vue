<template>
  <div class="app">

    <div class="title-bar">

      <div>
        <div class="nome">
          <p>Reminder</p>
        </div>
      </div>

      <div class="icons">
        <button @click="minimizeWindow">
          <Minus class="minimizar" size="20" />
        </button>
        <button v-if="!isMaximized" @click="maximizeWindow">
          <Maximize class="maximizar" size="20" />
        </button>
        <button v-if="isMaximized" @click="restoreWindow">
          <Minimize class="restaurar" size="20" />
        </button>
        <button @click="closeWindow">
          <X class="fechar" size="20" />
        </button>
      </div>


    </div>

    <div class="nav">
      <router-link to="/">Tarefas</router-link> -
      <router-link to="/concluidos">Tarefas Concluídas</router-link> -
      <router-link to="/calendario">Calendário</router-link>
    </div>

    <router-view />

    <div class="rodape">
      <p>Desenvolvido por <a href="https://github.com/vs-costa" target="_blank" rel="noopener noreferrer">Victor Soares |
          Reminder </a> &copy; 2024</p>
    </div>
  </div>
</template>

<script>
import { Minus } from 'lucide-vue-next';
import { Minimize } from 'lucide-vue-next';
import { Maximize } from 'lucide-vue-next';
import { X } from 'lucide-vue-next';


export default {

  components: {
    Minus,
    Maximize,
    Minimize,
    X,
  },

  data() {
    return {
      isMaximized: false
    }
  },

  methods: {
    minimizeWindow() {
      window.electronAPI.minimizeWindow()
    },
    maximizeWindow() {
      window.electronAPI.maximizeWindow()
    },
    restoreWindow() {
      window.electronAPI.restoreWindow()
    },
    closeWindow() {
      window.electronAPI.closeWindow()
    }
  },

  created() {
    window.electron.ipcRenderer.on('window-maximized', () => {
      this.isMaximized = true;
    });
    window.electron.ipcRenderer.on('window-restored', () => {
      this.isMaximized = false;
    });
  },

}

</script>

<style scoped lang="css">
.app {
  text-align: center;
  color: #F5E8C7;
  margin: 50px auto;
  padding-top: 30px;
}

.title-bar {
  background-color: #2C3E50;
  color: white;
  height: 30px;
  width: 100%;
  padding: 0;
  user-select: none;
  z-index: 999;
  position: fixed;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  -webkit-app-region: drag;
}

:root {
  --titlebar-area-x: 0;
  --titlebar-area-y: 0;
  --titlebar-area-width: 100%;
  --titlebar-area-height: 30px;
  /* Altura da sua barra de título personalizada */
}

.title-bar-content {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nome {
  margin-left: 10px;
  color: #F5E8C7;
}

.icons {
  margin-right: 10px;
  -webkit-app-region: no-drag;

  button {
    background-color: transparent;
    border: none;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #111a23;
    }
  }
}

.maximizar,
.minimizar,
.restaurar,
.fechar {
  margin-left: 5px;
  margin-right: 5px;
  color: #F5E8C7;
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
  padding: 38px 0 8px;
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
  z-index: 998;

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
