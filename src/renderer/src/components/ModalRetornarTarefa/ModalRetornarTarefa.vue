<template>
    <div v-show="retornarTarefa" class="modalRetornar">
        <div class="modalRetornarContent">
            <div v-if="retornarTarefa" class="retornarTarefa">
                <RotateCcw size="50" color="#f59e0b"/>
                <h2>Você deseja marcar essa tarefa como não concluída?</h2>
                <p>{{ retornarTarefa.texto }}</p>
            </div>
            <div class="confirmarRetorno">
                <button class="botaoConfirmar" @click="$emit('confirmar')">Confirmar</button>
                <button class="botaoCancelar" @click="$emit('cancelar')">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>

import { RotateCcw } from 'lucide-vue-next'

export default {

    props: ['retornarTarefa'],

    components: {
        RotateCcw
    }
}

</script>

<style scoped lang="css">
.modalRetornar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modalRetornarContent {
    background-color: #1f2937;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 60%;
}

.retornarTarefa {
    padding-bottom: 20px;

    h2 {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    p{
      color: #9da3ae;
    }
}

.confirmarRetorno {
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