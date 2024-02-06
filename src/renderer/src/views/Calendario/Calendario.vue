<template>
    <div>
        <h1>Calendário</h1>
        <div class="calendarioContainer">
            <FullCalendar :options="calendarOptions" />
            <ModalCalendario :tarefa="tarefaEmVisualizacao" :showModal="tarefaEmVisualizacao != null"
                @update-tarefa.native="atualizarTarefaNoCalendario" @close-modal="tarefaEmVisualizacao = null" />
        </div>
    </div>
</template>
  
<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import Metodos from '../../metodos/Metodos';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import ModalCalendario from '../../components/ModalCalendario/ModalCalendario.vue';
// import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';

export default {
    extends: Metodos,

    components: {
        FullCalendar,
        ModalCalendario,
        // ChevronRightIcon,
        // ChevronLeftIcon,
    },

    data() {
        return {
            tarefaEmVisualizacao: null,
        };
    },


    computed: {
        tarefasEmAndamento() {
            return this.tarefas.filter(tarefa => !tarefa.feito).map(tarefa => {
                return {
                    title: tarefa.texto,
                    start: tarefa.data,
                    description: tarefa.descricao,
                    task: tarefa
                };
            });
        },
        calendarOptions() {
            return {
                plugins: [dayGridPlugin],
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay',
                },
                weekends: true,
                locale: ptBrLocale,
                events: this.tarefasEmAndamento,
                eventClick: this.mostrarDescricao,
                eventMouseEnter: this.mudarCursorParaPointer,
                eventMouseLeave: this.mudarCursorParaPadrao,
            };
        },
    },
    methods: {
        mostrarDescricao(info) {
            this.tarefaEmVisualizacao = info.event.extendedProps.task;
        },
        mudarCursorParaPointer(info) {
            info.el.style.cursor = 'pointer';
        },
        mudarCursorParaPadrao(info) {
            info.el.style.cursor = 'default';
        },
    },

}
</script>
  
<style scoped lang="css">
h1 {
    margin-bottom: 20px;
}

.calendarioContainer {
    width: 70%;
    margin: 0 auto;
}
</style>
  