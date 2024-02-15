<template>
    <div v-show="limparTarefa" class="modalLimpar">
        <div class="modalLimparContent">
            <div v-if="limparTarefa" class="alerta">
                <AlertCircle size="80" color="#dc3545" />
                <h2>Tem certeza que deseja limpar a lista de tarfas concluídas?</h2>
                <p>Essa ação não pode ser revertida.</p>
            </div>
            <div class="confirmarLimpar">
                <button class="botaoLimpar" @click="$emit('limpar')">Limpar</button>
                <button class="botaoCancelar" @click="$emit('cancelar')">Cancelar</button>
            </div>
        </div>
        
    </div>
</template>

<script>
import { AlertCircle } from 'lucide-vue-next';

export default {

    props: ['limparTarefa'],

    components: {
        AlertCircle
    },

}

</script>

<style>

.modalLimpar {
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

.modalLimparContent {
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

.confirmarLimpar {
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

    .botaoLimpar {
        background-color: transparent;
        border: 1px solid #dc3545;

        &:hover {
            background-color: #dc3545;
        }
    }
}

</style>