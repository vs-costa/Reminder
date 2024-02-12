<template>
    <div v-show="deletarTarefa" class="modalDeletar">
        <div class="modalDeletarContent">
            <div v-if="deletarTarefa" class="alerta">
                <AlertCircle size="80" color="#dc3545" />
                <h2>Tem certeza que deseja deletar a tarefa<br>"{{ deletarTarefa.texto }}"?</h2>
                <p>Essa ação não pode ser revertida.</p>
            </div>
            <div class="confirmarDelete">
                <button class="botaoDeletar" @click="$emit('deletar')">Deletar</button>
                <button class="botaoCancelar" @click="$emit('cancelar')">Cancelar</button>
            </div>
        </div>


    </div>
</template>

<script>

import { AlertCircle } from 'lucide-vue-next';

export default {

    props: ['deletarTarefa'],

    components: {
        AlertCircle
    },
}

</script>

<style scoped lang="css">
.modalDeletar {
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

.modalDeletarContent {
    background-color: #1f2937;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 60%;
}

.alerta {
    margin-bottom: 20px;

    h2 {
        margin-bottom: 10px;
        margin-top: 10px;
    }

    p {
        color: #9da3ae;
    }
}

.confirmarDelete {
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

    .botaoCancelar {
        background-color: transparent;
        border: 1px solid #007bff;

        &:hover {
            background-color: #0056b3;
        }
    }

    .botaoDeletar {
        background-color: transparent;
        border: 1px solid #dc3545;

        &:hover {
            background-color: #dc3545;
        }
    }
}
</style>