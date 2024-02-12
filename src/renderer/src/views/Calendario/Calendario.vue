<template>
    <div>
        <div>
            <h1>Calendário</h1>
        </div>
        <div class="prevNext">
            <ChevronLeft class="prev" @click="goToPrev" />
            <ChevronRight class="next" @click="goToNext" />
        </div>
        <div class="calendarioContainer">
            <FullCalendar ref="fullCalendar" :options="calendarOptions" />
            <ModalCalendario :tarefa="tarefaEmVisualizacao" :showModal="tarefaEmVisualizacao != null"
                @update-tarefa.native="atualizarTarefaNoCalendario" @close-modal="tarefaEmVisualizacao = null"/>
            <ModalAdicionarTarefa :showModal="showModalAdicionarTarefa" :newTarefa="newTarefa" :selectedDate="selectedDate"
                @close-modal="showModalAdicionarTarefa = false" />

        </div>
    </div>
</template>
  
<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import Metodos from '../../metodos/Metodos';
import ModalCalendario from '../../components/ModalCalendario/ModalCalendario.vue';
import ModalAdicionarTarefa from '../../components/ModalAdicionarTarefa/ModalAdicionarTarefa.vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

export default {
    extends: Metodos,

    components: {
        FullCalendar,
        ModalCalendario,
        ModalAdicionarTarefa,
        ChevronRight,
        ChevronLeft,
    },

    data() {
        return {
            tarefaEmVisualizacao: null,
            showModalAdicionarTarefa: false,
            selectedDate: null,
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
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'title',
                    center: false,
                    right: 'dayGridMonth,dayGridWeek,dayGridDay',
                },
                weekends: true,
                locale: ptBrLocale,
                events: this.tarefasEmAndamento,
                dateClick: this.handleDateClick,
                eventClick: this.mostrarDescricao,
                eventMouseEnter: this.mudarCursorParaPointer,
                eventMouseLeave: this.mudarCursorParaPadrao,
                editable: true,
                eventDrop: this.handleEventDrop,
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
        handleEventDrop(info) {
            const droppedEvent = info.event;
            const originalEventObject = info.oldEvent;

            const updatedTaskIndex = this.tarefas.findIndex(tarefa => tarefa === originalEventObject.extendedProps.task);
            if (updatedTaskIndex !== -1) {
                const isoDateString = droppedEvent.start.toISOString().split('T')[0];
                this.tarefas[updatedTaskIndex].data = isoDateString;
                this.armazenarTarefas();
            }
        },
        goToPrev() {
            this.$refs.fullCalendar.getApi().prev();
        },
        goToNext() {
            this.$refs.fullCalendar.getApi().next();
        },
        handleDateClick(clickInfo) {
            const date = clickInfo.dateStr;
            this.selectedDate = date;
            this.showModalAdicionarTarefa = true;
        },
        atualizarCalendario() {
            let calendarApi = this.$refs.fullCalendar.getApi();
            calendarApi.refetchEvents();
        },
        toogleModal() {
            this.showModalAdicionarTarefa = false;
            this.atualizarCalendario();
        },
    },

}
</script>
  
<style scoped lang="css">
h1 {
    margin-bottom: 20px;
    text-align: center;
}

.calendarioContainer {
    width: 70%;
    margin: 0 auto;
}

.prevNext {
    position: relative;
    display: flex;
    justify-content: center;
    top: 40px;
    background-color: transparent;
}

.prev,
.next {
    cursor: pointer;
    padding: 8px;
    margin-left: 2px;
    margin-right: 2px;
    z-index: 1;
    background-color: #2C3E50;
    border-radius: 5px;
}

.prev:hover,
.next:hover {
    background-color: #1A252F;
}
</style>