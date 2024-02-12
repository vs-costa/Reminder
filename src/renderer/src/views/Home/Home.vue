<template>
    <div class="tarefasContent">
        <div class="tarefasContainer">

            <div class="titulo">
                <h1>Lista de Tarefas</h1>
            </div>

            <div role="alert" v-show="tarefas.length === 0">
                <h3>Não existem tarefas!</h3>
            </div>

            <div class="listaTarefas">

                <div v-for="(tarefa, index) in tarefasEmAndamento" :key="index" class="tarefa">

                    <div class="textoData">
                        <div class="tarefaTexto" @click="toogleDescricao(tarefa.id, tarefas)">
                            <p>{{ tarefa.texto }}</p>
                        </div>


                        <div class="tarefaData" :class="{ 'data-passada': isDataPassada(tarefa.data) }">
                            <p>{{ formatarData(tarefa.data) }}</p>
                        </div>

                        <div class="botoesTarefa">
                            <CheckCircle class="iconeConcluir" @click="concluirTarefa(tarefa)" color="#54ba91"
                                cursor="pointer" />
                            <CircleEllipsis class="iconeEditar" @click="abrirFormularioEdicao(tarefa)" color="#f59e0b"
                                cursor="pointer" />
                            <XCircle @click="confirmarDeletar(tarefa)" color="#ff4003" cursor="pointer" />
                        </div>
                    </div>

                    <div class="toogleDescricao">
                        <div v-if="tarefa.mostrarDescricao" class="tarefaDescricao">
                            <h4>Descrição</h4>
                            <p>{{ tarefa.descricao }}</p>
                        </div>
                    </div>

                    <hr>

                    <div class="modal" v-if="showModal">
                        <div class="modal-content">
                            <CheckCircle size="50" color="#54ba91" />
                            <h2>Tarefa concluída!</h2>
                        </div>
                    </div>

                    <ModalEditar v-if="tarefaEmEdicao" :tarefaEmEdicao="tarefaEmEdicao" @confirmar="editarTarefa"
                        @cancelar="cancelarEdicao" />
                    <ModalDeletarTarefa v-if="deletarTarefa" :deletarTarefa="deletarTarefa" @deletar="removerTarefa"
                        @cancelar="cancelarDelete" />
                </div>
            </div>

            <div class="botaoContainer">

                <input type="text" placeholder="Nova tarefa..." v-model="newTarefa.texto">
                <input type="date" v-model="newTarefa.data">
                <textarea placeholder="Descrição da tarefa..." v-model="newTarefa.descricao"></textarea>

                <button class="adicionar" @click="adicionarTarefa()">Adicionar</button>

                <!-- <button class="limparTudo" @click="tarefas = []; armazenarTarefas()" v-if="tarefas.length">Limpar
                    tudo</button> -->
            </div>

            <ModalAlertaErroTitulo v-show="exibirModalErro" @cancelar="fecharModalErro" />
            <ModalAlertaPreenchimento v-show="exibirModalPreenchimento" @cancelar="fecharModalPreenchimento" />

        </div>
    </div>
</template>

<script>

import { CheckCircle, XCircle, CircleEllipsis } from 'lucide-vue-next';
import Metodos from '../../metodos/Metodos.js'
import ModalEditar from '../../components/ModalEditar/ModalEditar.vue';
import ModalDeletarTarefa from '../../components/ModalDeletarTarefa/ModalDeletarTarefa.vue';
import ModalAlertaErroTitulo from '../../components/ModalAlertaErroTitulo/ModalAlertaErroTitulo.vue';
import ModalAlertaPreenchimento from '../../components/ModalAlertaPreenchimento/ModalAlertaPreenchimento.vue';

export default {

    extends: Metodos,

    components: {
        CheckCircle, XCircle, CircleEllipsis,
        ModalEditar,
        ModalDeletarTarefa,
        ModalAlertaErroTitulo,
        ModalAlertaPreenchimento,
    },

    computed: {
        tarefasEmAndamento() {
            return this.tarefas.filter(tarefa => !tarefa.feito);
        },
    },
}
</script>


<style lang="css">
.tarefasContent {
    display: flex;
    justify-content: center;
}

.tarefasContainer {
    width: 70%;
}

.titulo {
    text-align: center;
    margin-bottom: 24px;
    width: 100%;
}

hr {
    border-color: #F5E8C7;
}

.textoData {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
}

.data-passada {
    color: #ff4003;
    font-weight: bold;
}

.tarefaTexto {
    min-width: 70%;
    text-align: justify;
    border: solid 1px #F5E8C7;
    padding: 8px;
    border-radius: 8px;
}

.tarefaData {
    border: solid 1px #F5E8C7;
    text-align: center;
    padding: 8px;
    border-radius: 8px;
    min-width: 90px;
}

.toogleDescricao {
    text-align: justify;
    margin-top: 15px;

}

.toogleDescricao p {
    padding: 8px;
}

.toogleDescricao h4 {
    padding: 8px;
    color: #9da3ae;
}

.tarefaTexto {
    cursor: pointer;
}

.botaoContainer {

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


    input {
        box-sizing: border-box;
        height: 28px;
        border-radius: .25rem;
        width: 100%;
        border: 1px solid #9da3ae;
        margin-top: 20px;
        margin-bottom: 20px;
        color: #9da3ae;
        padding: 10px;

        placeholder {
            color: #9da3ae;
        }
    }

    textarea {
        box-sizing: border-box;
        height: 100px;
        border-radius: .25rem;
        width: 100%;
        border: 1px solid #9da3ae;
        margin-top: 20px;
        margin-bottom: 20px;
        color: #9da3ae;
        padding: 10px;
    }

    input[type="text"]::placeholder {
        color: #9da3ae;
    }

    input[type="date"]::placeholder {
        color: #9da3ae;
    }

    textarea::placeholder {
        color: #9da3ae;
    }

    ::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
}

.iconeConcluir {
    margin-right: 8px;
    margin-left: 8px;
}

.iconeEditar {
    margin-right: 8px;
}

.adicionar {
    background-color: #007bff;
    border: 1px solid #007bff;
    margin-left: 2px;
    width: 100%;
    margin-bottom: 15px;

    &:hover {
        background-color: #007bff;
        color: #fff;
        opacity: 0.8;
    }
}

/* .limparTudo {
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
} */

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-content {
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    h2 {
        margin-top: 10px;
    }
}
</style>