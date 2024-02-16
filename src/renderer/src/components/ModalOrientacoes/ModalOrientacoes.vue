<template>
    <div class="modaOrientacao" v-if="modalOrientacao" @click="fecharModal">

        <div class="modaOrientacaoContent">

            <div class="orientacaoTitulo">
                <h3>Orientações:</h3>
            </div>

            <div class="orientaçãoTexto">
                <p>Para adicionar uma nova tarefa, clique em uma data no calendário. As opções para adicionar uma nova
                    tarefa serão exibidas automaticamente.</p>
                <br />
                <p>A data ao adicionar uma nova tarefa será automaticamente definida como a data em que você clicou.</p>
                <br />
                <p>Para alterar a data de uma tarefa, basta segurar e arrastar a tarefa para a nova data desejada.</p>
                <br />
                <p>Ao clicar em uma tarefa, você poderá visualizar informações detalhadas e realizar ações como concluir,
                    editar ou excluir a tarefa.</p>
                <br />
                <p>Explore o calendário usando as setas direcionais ou altere a visualização para Mês, Semana ou Dia.</p>
            </div>

            <div class="orientacaoLegenda">
                <h3>Legenda das cores:</h3>
                <div class="legendaPrioridadeContent">
                    <div class="legendaPrioridade">
                        <Squircle color="#007bff" style="margin-right: 5px;" />
                        <p>Prioridade normal</p>
                    </div>
                    <div class="legendaPrioridade">
                        <Squircle color="#f59e0b" style="margin-right: 5px;" />
                        <p>Prioridade média</p>
                    </div>
                    <div class="legendaPrioridade">
                        <Squircle color="#ff4003" style="margin-right: 5px;" />
                        <p>Prioridade alta</p>
                    </div>
                </div>
            </div>

            <button class="botaoFechar" @click="fecharModal">Fechar</button>
        </div>
    </div>
</template>

<script>

import { Squircle } from 'lucide-vue-next';

export default {
    props: ['modalOrientacao'],

    components: {
        Squircle,
    },

    methods: {
        fecharModal() {
            this.$emit('fechar')
        },
    },

}

</script>

<style scoped lang="css">
.modaOrientacao {
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

.modaOrientacaoContent {
    background-color: #1f2937;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 60%;
}

.orientacaoTitulo {
    margin-bottom: 10px;
}

.orientaçãoTexto {
    text-align: center;
    color: #9da3ae;
}

.orientacaoLegenda {
    margin-top: 20px;

    h3 {
        margin-bottom: 10px;
    }
}

.legendaPrioridadeContent {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
    margin-top: 8px;
}

.legendaPrioridade {
    display: flex;
    color: #9da3ae;
    margin-left: 12px;
    margin-right: 12px;
}

.botaoFechar {
    background-color: transparent;
    max-width: 50%;
    color: #F5E8C7;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
    background-color: transparent;
    border: 1px solid #007bff;

    &:hover {
        background-color: #007bff;

    }
}
</style>