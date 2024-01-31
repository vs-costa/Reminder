<template>
    <div>
        <h1>Calendário</h1>
        <div class="calendarioContainer">
            <FullCalendar :options="calendarOptions" />
        </div>
    </div>
</template>
  
<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import Metodos from '../../metodos/Metodos';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
// import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';

export default {
    extends: Metodos,

    components: {
        FullCalendar,
        // ChevronRightIcon,
        // ChevronLeftIcon,
    },

    computed: {
        tarefasEmAndamento() {
            return this.tarefas.filter(tarefa => !tarefa.feito).map(tarefa => {
                return {
                    title: tarefa.texto,
                    start: tarefa.data,
                    description: tarefa.descricao,
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
            };
        },
    },
    methods: {
        mostrarDescricao(info) {
            alert(info.event.extendedProps.description);
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
  