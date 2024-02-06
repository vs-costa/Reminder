<template>
    <div v-if="tarefa">
        <div v-if="showModal" class="modalCalendario">
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
                <div class="layoutBotao">
                    <button v-if="editMode" @click="salvarEdicao" class="salvarEdicao">Salvar</button>
                    <button v-else @click="ativarModoEdicao" class="botaoEditar">Editar</button>
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

    props: ['tarefa', 'showModal'],

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
            if (!this.editMode) {
                this.toogleModal();
            }
        },
        salvarEdicao() {
            this.editMode = false;
            this.$emit('update-tarefa', this.tarefa);
        },
        toogleModal() {
            this.editMode = false;
            this.$emit('close-modal');
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

.salvarEdicao,
.botaoEditar {
    background-color: transparent;
    border: 1px solid #007bff;
}

.salvarEdicao:hover,
.botaoEditar:hover {
    background-color: #0056b3;
}

.botaoFechar {
    background-color: transparent;
    border: 1px solid #dc3545;
}

.botaoFechar:hover {
    background-color: #dc3545;
}

.layoutBotao {
    background-color: transparent;
}
</style>
