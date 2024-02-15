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
                            <RotateCcw @click="confirmarRetornar(tarefa)" color="#f59e0b" cursor="pointer" />
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
                    <button class="limparTarefas" @click="confirmarLimparTarefa" v-if="tarefasConcluidas.length">
                        Limpar Tarefas Concluídas
                    </button>
                </div>
                <ModalRetornarTarefa v-if="retornarTarefa" :retornarTarefa="retornarTarefa"
                    @confirmar="desmarcarTarefaConcluida" @cancelar="cancelarRetorno" />
                <ModalLimparTarefasConcluidas v-if="limparTarefa" :limparTarefa="limparTarefa"
                    @limpar="limparTarefasConcluidas" @cancelar="cancelarLimpar" />
            </div>
        </div>
    </div>
</template>
  
<script>
import Metodos from '../../metodos/Metodos.js'
import ModalRetornarTarefa from '../../components/ModalRetornarTarefa/ModalRetornarTarefa.vue'
import ModalLimparTarefasConcluidas from '../../components/ModalLimparTarefasConcluidas/ModalLimparTarefasConcluidas.vue'
import { RotateCcw } from 'lucide-vue-next'

export default {
    extends: Metodos,

    components: {
        ModalRetornarTarefa,
        ModalLimparTarefasConcluidas,
        RotateCcw
    },

    data() {
        return {
            limparTarefa: null
        }
    },

    computed: {
        tarefasConcluidas() {
            return this.tarefas.filter(tarefa => tarefa.feito);
        }
    },

    methods: {
        confirmarLimparTarefa() {
            this.limparTarefa = true;
        },
        limparTarefasConcluidas() {
            this.tarefas = this.tarefas.filter(tarefa => !tarefa.feito);
            this.armazenarTarefas();
            this.limparTarefa = false;
        },
        cancelarLimpar() {
            this.limparTarefa = false;
        },
        desmarcarTarefaConcluida() {
            if (this.retornarTarefa) {
                const index = this.tarefasConcluidas.findIndex(t => t.id === this.retornarTarefa.id);

                if (index !== -1) {
                    this.tarefasConcluidas[index].feito = false;
                    this.armazenarTarefas();
                }

                this.retornarTarefa = null;
                this.$forceUpdate();
            }
        },
        cancelarRetorno() {
            this.retornarTarefa = null
        },
        confirmarRetornar(tarefa) {
            this.retornarTarefa = { ...tarefa };
        },
    },
}

</script>
  
<style scoped lang="css">
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
    min-width: 90px;
}

hr {
    border-color: #F5E8C7;
    margin-top: 15px;
}

.toogleDescricao {
    text-align: justify;
    margin-top: 15px;

    p {
        padding: 8px;
    }

    h4 {
        padding: 8px;
        color: #9da3ae;
    }
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