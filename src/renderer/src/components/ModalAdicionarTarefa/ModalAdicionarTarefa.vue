<template>
    <div v-show="showModalAdicionar" class="adicionarContent">
        <div class="adicionarContainer">

            <h2>Adicionar Tarefa</h2>

            <p><strong>Data: </strong>{{ formatarData(newTarefa.data) }}</p>

            <div class="prioridadeDropdown">
                <label for="prioridade">Prioridade:</label>
                <select v-model="newTarefa.prioridade">
                    <option value="Normal">Normal</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                </select>
            </div>
            <input type="text" placeholder="Nova tarefa..." v-model="newTarefa.texto">
            <textarea placeholder="Descrição da tarefa..." v-model="newTarefa.descricao"></textarea>

            <button class="adicionar" @click="adicionaTarefaCalendario(newTarefa)">Adicionar</button>
            <button @click="$emit('close-modal')" class="botaoFechar">Fechar</button>
        </div>
    </div>
</template>

<script>

import Metodos from '../../metodos/Metodos';

export default {

    extends: Metodos,

    props: ['showModalAdicionar', 'selectedDate'],

    watch: {
        selectedDate(newValue) {
            this.newTarefa.data = newValue;
        },
    },

    methods: {
        adicionaTarefaCalendario() {
            this.$emit('adicionar-tarefa', this.newTarefa)
        }
    },
}

</script>

<style scoped lang="css">
.adicionarContent {
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

p {
    margin-top: 20px;
    color: #9da3ae;
}

.adicionarContainer {

    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 30px;
    border-radius: 8px;
    background-color: #1f2937;

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
        margin-bottom: 10px;
        color: #9da3ae;
        padding: 10px;
        background-color: #1f2937;

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
        margin-top: 10px;
        margin-bottom: 20px;
        color: #9da3ae;
        padding: 10px;
        background-color: #1f2937;
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

.prioridadeDropdown {
    margin-top: 20px;

    label {
        margin-right: 10px;
        color: #9da3ae;
    }

    select {
        box-sizing: border-box;
        height: 28px;
        border-radius: .25rem;
        border: 1px solid #9da3ae;
        color: #9da3ae;
        padding: 5px;
        background-color: #1f2937;

        option {
            background-color: #2d3648;
            color: #9da3ae;
        }
    }
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

.botaoFechar {
    background-color: transparent;
    border: 1px solid #dc3545;

    &:hover {
        background-color: #dc3545;
        color: #fff;
        opacity: 0.8;
    }
}
</style>