<template>
    <div v-show="alertaPreenchimento" class="modalAlerta">
        <div class="modalAlertaContent">
            <div class="alerta">
                <AlertTriangle size="80" color="#f59e0b" />
                <h2>O título e data da tarefa são obrigatórios.</h2>
            </div>
            <div class="confirmar">
                <button class="botaoOk" @click="$emit('cancelar')">Ok</button>
            </div>
        </div>
    </div>
</template>

<script>

import { AlertTriangle } from 'lucide-vue-next';

export default {

    props: ['alertaPreenchimento'],

    components: { AlertTriangle },

}

</script>

<style scoped lang="css">
.modalAlerta {
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

.modalAlertaContent {
    background-color: #1f2937;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 60%;
}

.alerta {
    padding-bottom: 20px;

    h2 {
        margin-top: 15px;
        margin-bottom: 15px;
    }
}

.confirmar {
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

    .botaoOk {
        background-color: transparent;
        border: 1px solid #007bff;

        &:hover {
            background-color: #0056b3;
        }
    }
}
</style>