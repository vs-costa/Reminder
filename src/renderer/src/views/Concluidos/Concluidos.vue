<template>
    <div class="concluidoContent">
        <div class="concluidoContainer">
            <div class="titulo">
                <h1>Tarefas Concluídas</h1>
            </div>
            <div role="alert" v-show="tarefasConcluidas.length === 0">
                <h3>Nenhuma tarefa concluída ainda!</h3>
            </div>
            <div class="listaTarefasConcluido">
                <div v-for="(tarefa, index) in tarefasConcluidas" :key="index" class="tarefaConcluida">
                    <div class="textoData">
                        <div class="tarefaTextoConcluida" @click="toogleDescricao(tarefa.id, tarefasConcluidas)">
                            <p>{{ tarefa.texto }}</p>
                        </div>
                        <div class="tarefaDataConcluida">
                            <p>{{ formatarData(tarefa.data) }}</p>
                        </div>
                        <div>
                            <RotateCcw @click="desmarcarTarefaConcluida(tarefa)" color="#f59e0b" cursor="pointer" />
                        </div>
                    </div>
                    <div class="toogleDescricao">
                        <div v-if="tarefa.mostrarDescricao" class="tarefaDescricao">
                            <h4>Descrição</h4>
                            <p>{{ tarefa.descricao }}</p>
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="botaoLimparContainer">
                    <button class="limparTarefas" @click="limparTarefasConcluidas" v-if="tarefasConcluidas.length">
                        Limpar Tarefas Concluídas
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Metodos from '../../metodos/Metodos.js'
import { RotateCcw } from 'lucide-vue-next'

export default {
    extends: Metodos,

    components: {
        RotateCcw
    },

    methods: {
        limparTarefasConcluidas() {
            this.tarefas = this.tarefas.filter(tarefa => !tarefa.feito)
            this.armazenarTarefas()
        },
        desmarcarTarefaConcluida(tarefa) {
            if (confirm('Você deseja marcar esta tarefa como não concluída?')) {
                tarefa.feito = false
                this.armazenarTarefas()
            }
        },
    },
    computed: {
        tarefasConcluidas() {
            return this.tarefas.filter(tarefa => tarefa.feito)
        }
    },
    created() {
        this.tarefasConcluidas = localStorage.getItem('tarefasConcluidas')
            ? JSON.parse(localStorage.getItem('tarefasConcluidas')).map(tarefa => ({ ...tarefa, mostrarDescricao: false }))
            : this.tarefasConcluidas;
    },
}
</script>
  
<style lang="css">
.concluidoContent {
    display: flex;
    justify-content: center;
}

.concluidoContainer {
    width: 70%;
}

.titulo {
    text-align: center;
    margin-bottom: 24px;
    width: 100%;
}

.listaTarefasConcluido {
    margin-top: 15px;
}

.tarefaConcluida {
    margin-bottom: 15px;
}

.textoData {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tarefaTextoConcluida {
    min-width: 70%;
    text-align: justify;
    border: solid 1px #F5E8C7;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
}

.tarefaDataConcluida {
    border: solid 1px #F5E8C7;
    text-align: center;
    padding: 8px;
    border-radius: 8px;
}

hr {
    border-color: #F5E8C7;
    margin-top: 15px;
}

.botaoLimparContainer {

    display: flex;
    flex-direction: column;
    margin-top: 30px;

    button {
        margin-top: 20px;
        background-color: transparent;
        cursor: pointer;
        box-sizing: border-box;
        height: 28px;
        border-radius: .25rem;
        color: #F5E8C7;
    }
}

.limparTarefas {
    background-color: #dc3545;
    border: 1px solid #dc3545;
    display: block;
    margin: auto;
    width: 100%;

    &:hover {
        background-color: #dc3545;
        color: #fff;
        opacity: 0.8;
    }
}
</style>