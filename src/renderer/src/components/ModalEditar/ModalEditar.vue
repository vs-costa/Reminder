<template>
    <div v-show="tarefaEmEdicao" class="modalEditar">
        <div class="modalContent">
            <div class="tituloEditar">
                <h1>Editar Tarefa</h1>
            </div>
            <div class="infoEditar">
                <input v-model="tarefaEmEdicao.texto" placeholder="Título">
                <input v-model="tarefaEmEdicao.data" type="date">
                <textarea v-model="tarefaEmEdicao.descricao" placeholder="Descrição"></textarea>
            </div>
            <div class="confirmarEdicao">
                <button class="botaoConfirmar" @click="$emit('confirmar')">Confirmar</button>
                <button class="botaoCancelar" @click="$emit('cancelar')">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    props: ['tarefaEmEdicao'],

};

</script>

<style>
.modalEditar {
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

.modalContent {
    background-color: #1f2937;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 60%;
}

.tituloEditar{
    margin-bottom: 20px;
}

.infoEditar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: transparent;


    input,
    textarea {
        margin-bottom: 15px;
        background-color: transparent;
        border: solid 1px #9da3ae;
        border-radius: 8px;
        padding: 10px;
        color: #9da3ae;
    }

    textarea {
        height: 100px
    }

    ::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
}

.confirmarEdicao {
    background-color: transparent;

    button {
        max-width: 50%;
        color: #F5E8C7;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
        margin-left: 10px;

    }

    .botaoConfirmar {
        background-color: transparent;
        border: 1px solid #007bff;

        &:hover {
            background-color: #0056b3;
        }
    }

    .botaoCancelar {
        background-color: transparent;
        border: 1px solid #dc3545;

        &:hover {
            background-color: #dc3545;
        }
    }
}
</style>