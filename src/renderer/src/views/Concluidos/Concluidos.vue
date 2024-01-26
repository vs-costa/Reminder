<template>
    <div>
        <div class="titulo">
            <h1>Tarefas Concluídas</h1>
        </div>
        <div class="listaTarefasConcluido">
            <div v-for="(tarefa, index) in tarefasConcluidas" :key="index" class="tarefaConcluida">
                <div class="TextoConcluido">
                    <p>{{ tarefa.texto }}</p>
                </div>
                <div class="DataConcluida">
                    <p>{{ tarefa.data }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

import Metodos from '../../metodos/Metodos.js'

export default {
    extends: Metodos,

    computed: {
        tarefasConcluidas() {
            return this.tarefas.filter(tarefa => tarefa.feito);
        }
    },
    created() {
        this.tarefasConcluidas = localStorage.getItem("tarefasConcluidas") ? JSON.parse(localStorage.getItem("tarefasConcluidas")) : this.tarefasConcluidas;
    },
}

</script>

<style lang="css">
.listaTarefasConcluido {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tarefaConcluida {
    width: 70%;
    margin-bottom: 15px;
    border: solid 1px #c1c1c1;
    border-radius: 8px;
    overflow: hidden;
}

.TextoConcluido {
    flex: 1;
    text-align: justify;
    padding: 8px;
}

.DataConcluida {
    min-width: 100px;
    text-align: center;
    padding: 8px;
    border-left: solid 1px #c1c1c1;
}
</style>