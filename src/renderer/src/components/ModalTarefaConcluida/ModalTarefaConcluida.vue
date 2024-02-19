<template>
    <div class="modal" v-if="modalConcluir" @click="fecharModal">
        <div class="modal-content">
            <CheckCircle size="50" color="#54ba91" />
            <h2>Tarefa concluída!</h2>
        </div>
    </div>
</template>

<script>

import { CheckCircle } from 'lucide-vue-next';

export default {

    props: ['modalConcluir'],

    components: {
        CheckCircle,
    },

    methods:{
        fecharModal(){
            this.$emit('fechar');
        }
    },
}
</script>

<style scoped lang="css">
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
    background-color: #1f2937;

    h2 {
        margin-top: 10px;
    }
}
</style>