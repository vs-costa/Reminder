<template>
    <div v-if="tarefa">
        <div v-if="showModalCalendario" class="modalCalendario">
            <div class="modalCalendarioContent">
                <div>
                    <label>
                        <h3>
                            Tarefa:
                        </h3>
                        <input v-if="editMode" v-model="tarefa.texto">
                        <span v-else>{{ tarefa.texto }}</span>
                    </label>
                </div>
                <div>
                    <label>
                        <h3>
                            Data:
                        </h3>
                        <input v-if="editMode" v-model="tarefa.data" type="date" />
                        <span v-else>{{ formatarData(tarefa.data) }}</span>
                    </label>
                </div>
                <div>
                    <label>
                        <h3>
                            Descrição:
                        </h3>
                        <textarea v-if="editMode" v-model="tarefa.descricao"></textarea>
                        <span v-else>{{ tarefa.descricao }}</span>
                    </label>
                </div>
                <div class="prioridadeDropdown">
                    <label>
                        <h3>
                            Prioridade:
                        </h3>
                        <select v-if="editMode" v-model="tarefa.prioridade">
                            <option value="Normal">Normal</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
                        </select>
                        <span v-else>{{ tarefa.prioridade }}</span>
                    </label>
                </div>


                <div class="layoutBotao">
                    <!-- Botão para concluir tarefa -->
                    <button v-if="!editMode" @click="concluirTarefaCalendario(tarefa)"
                        class="botaoConcluir">Concluir</button>
                    <!-- botão salvar e editar -->
                    <button v-if="editMode" @click="salvarEdicao" class="salvarEdicao">Salvar</button>
                    <button v-else @click="ativarModoEdicao" class="botaoEditar">Editar</button>
                    <!-- botão deletar -->
                    <button v-if="!editMode" @click="confirmarDeletarCalendario(tarefa)"
                        class="botaoExcluir">Excluir</button>
                    <!-- botão fechar -->
                    <button v-if="editMode" @click="toogleEditMode" class="botaoFechar">Fechar</button>
                    <button v-else @click="toogleModal" class="botaoFechar">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Metodos from '../../metodos/Metodos';

export default {
    extends: Metodos,

    props: ['tarefa',
        'showModalCalendario'
    ],

    data() {
        return {
            editMode: false,
        }
    },

    methods: {
        ativarModoEdicao() {
            this.editMode = true;
        },
        toogleEditMode() {
            this.editMode = !this.editMode;
        },
        salvarEdicao() {
            this.editMode = false;
            this.$emit('update-tarefa', this.tarefa);
        },
        toogleModal() {
            this.modalTarefa = false;
            this.$emit('close-modal');
        },
        confirmarDeletarCalendario(tarefa) {
            this.$emit('deletar-calendario', tarefa)
        },
        concluirTarefaCalendario(tarefa) {
            this.$emit('concluir-calendario', tarefa)
        },
    },
}
</script>

<style scoped lang="css">
.modalCalendario {
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

.modalCalendarioContent {
    background-color: #1f2937;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 60%;
}

.modalCalendarioContent label {
    display: block;
    margin-bottom: 10px;
}

.modalCalendarioContent input,
.modalCalendarioContent textarea {
    width: 80%;
    padding: 10px;
    border: 1px solid #9da3ae;
    border-radius: 8px;
    background-color: transparent;
    color: #9da3ae;
    margin-bottom: 15px;
}

.modalCalendarioContent input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
}

.modalCalendarioContent textarea {
    height: 100px;
}

.modalCalendarioContent button {
    max-width: 50%;
    color: #F5E8C7;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    margin-left: 10px;
}

.botaoConcluir,
.salvarEdicao {
    background-color: transparent;
    border: 1px solid #54ba91;

    &:hover {
        background-color: #54ba91;
        color: #fff;
        opacity: 0.8;
    }
}

.botaoEditar {
    background-color: transparent;
    border: 1px solid #f59e0b;

    &:hover {
        background-color: #f59e0b;
        color: #fff;
        opacity: 0.8;
    }
}

.botaoExcluir {
    background-color: transparent;
    border: 1px solid #dc3545;

    &:hover {
        background-color: #dc3545;
        color: #fff;
        opacity: 0.8;
    }
}

.botaoFechar {
    background-color: transparent;
    border: 1px solid #007bff;

    &:hover {
        background-color: #007bff;
        color: #fff;
        opacity: 0.8;
    }
}

.layoutBotao {
    background-color: transparent;
    margin-top: 20px;
}

.prioridadeDropdown {
    margin-top: 10px;

    select {
        box-sizing: border-box;
        height: 28px;
        width: 200px;
        border-radius: .25rem;
        border: 1px solid #9da3ae;
        color: #9da3ae;
        padding: 5px;
        margin-top: 10px;
        margin-bottom: 10px;

        option {
            background-color: #2d3648;
            color: #9da3ae;
        }
    }
}
</style>