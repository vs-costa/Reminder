<template>
    <div>
        <div class="calendarioTitulo">
            <h1>Calendário</h1>
        </div>

        <div class="orientações" @click="toggleModalOrientacoes">
            <p>Clique aqui para abrir as orientações.</p>
        </div>

        <div class="prevNext">
            <ChevronLeft class="prev" @click="goToPrev" />
            <ChevronRight class="next" @click="goToNext" />
        </div>
        <div class="calendarioContainer">
            <FullCalendar ref="fullCalendar" :options="calendarOptions" />
            <!-- Modal com Orientações -->
            <ModalOrientacoes :modalOrientacao="showModalOrientacoes" @fechar="fecharModalOrientacoes" />
            <!-- Modal abre ao clicar em uma tarefa já cadastrada no calendário -->
            <ModalCalendario :tarefa="tarefaEmVisualizacao" :showModalCalendario="tarefaEmVisualizacao != null"
                @update-tarefa.native="atualizarTarefaNoCalendario" @close-modal="tarefaEmVisualizacao = null"
                @deletar-calendario="confirmarDeletarCalendario" @concluir-calendario="concluirTarefaCalendario" />
            <!-- Modal abre ao clicar em uma data qualquer no calendário -->
            <ModalAdicionarTarefa :showModalAdicionar="showModalAdicionarTarefa" :newTarefa="newTarefa"
                :selectedDate="selectedDate" @close-modal="showModalAdicionarTarefa = false"
                @adicionar-tarefa="adicionarTarefaCalendario" />
            <!-- Modal de erro ao adicionar tarefa -->
            <ModalAlertaErroTitulo :alertaErroTitulo="exibirModalErro" @cancelar="fecharModalErro" />
            <ModalAlertaPreenchimento :alertaPreenchimento="exibirModalPreenchimento"
                @cancelar="fecharModalPreenchimento" />
            <!-- Modal abre ao clicar no botão Excluir dentro do ModalCalendario -->
            <ModalDeletarTarefa v-if="deletarTarefa" :deletarTarefa="deletarTarefa" @deletar="removerTarefaCalendario"
                @cancelar="cancelarDelete" />
            <!-- Modal aparece ao concluir uma tarefa -->
            <ModalTarefaConcluida v-if="modalConcluir" :modalConcluir="modalConcluir != null"
                @fechar="modalConcluir = false" />

        </div>
    </div>
</template>
  
<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import Metodos from '../../metodos/Metodos';
import { v4 as uuidv4 } from 'uuid';
import ModalCalendario from '../../components/ModalCalendario/ModalCalendario.vue';
import ModalAdicionarTarefa from '../../components/ModalAdicionarTarefa/ModalAdicionarTarefa.vue';
import ModalDeletarTarefa from '../../components/ModalDeletarTarefa/ModalDeletarTarefa.vue';
import ModalAlertaErroTitulo from '../../components/ModalAlertaErroTitulo/ModalAlertaErroTitulo.vue';
import ModalAlertaPreenchimento from '../../components/ModalAlertaPreenchimento/ModalAlertaPreenchimento.vue';
import ModalTarefaConcluida from '../../components/ModalTarefaConcluida/ModalTarefaConcluida.vue';
import ModalOrientacoes from '../../components/ModalOrientacoes/ModalOrientacoes.vue';
import { ChevronLeft, ChevronRight, CheckCircle, Squircle } from 'lucide-vue-next';

export default {
    extends: Metodos,

    components: {
        ChevronRight, ChevronLeft, CheckCircle, Squircle,
        FullCalendar,
        ModalCalendario,
        ModalAdicionarTarefa,
        ModalDeletarTarefa,
        ModalAlertaErroTitulo,
        ModalAlertaPreenchimento,
        ModalTarefaConcluida,
        ModalOrientacoes,
    },

    data() {
        return {
            tarefaEmVisualizacao: null,
            showModalAdicionarTarefa: null,
            selectedDate: null,
            modalConcluir: null,
            showModalOrientacoes: true,
        };
    },

    computed: {
        tarefasEmAndamento() {
            return this.tarefas.filter(tarefa => !tarefa.feito).map(tarefa => {
                return {
                    title: tarefa.texto,
                    start: tarefa.data,
                    description: tarefa.descricao,
                    task: tarefa,
                    borderColor: this.getColor(tarefa.prioridade),

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
                contentHeight: 'auto',
                handleWindowResize: true,
                events: this.tarefasEmAndamento,
                dateClick: this.handleDateClick,
                eventClick: this.mostrarDescricao,
                eventMouseEnter: this.mudarCursorParaPointer,
                eventMouseLeave: this.mudarCursorParaPadrao,
                editable: true,
                eventDrop: this.handleEventDrop,
                eventOrder: this.compararPrioridade,
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
        toogleModalAdicionarTarefa() {
            this.showModalAdicionarTarefa = false;
        },
        confirmarDeletarCalendario(tarefa) {
            this.deletarTarefa = { ...tarefa };
        },
        removerTarefaCalendario(tarefa) {
            const index = this.tarefas.findIndex(t => t.id === this.deletarTarefa.id);
            if (index !== -1) {
                this.tarefas.splice(index, 1);
                this.armazenarTarefas();
            }
            this.deletarTarefa = null
            this.$forceUpdate();
            this.atualizarCalendario();
            this.tarefaEmVisualizacao = null;
        },
        atualizarTarefaNoCalendario(tarefaAtualizada) {
            const index = this.tarefas.findIndex(tarefa => tarefa.id === tarefaAtualizada.id);
            if (index !== -1) {
                this.tarefas[index] = tarefaAtualizada;
                this.armazenarTarefas();
                this.tarefaEmVisualizacao = null;
            }
        },
        atualizarCalendario() {
            this.$refs.fullCalendar.getApi().refetchEvents();
        },
        adicionarTarefaCalendario(newTarefa) {
            if (newTarefa.texto && newTarefa.data) {
                let textoTarefa = newTarefa.texto.trim();
                if (textoTarefa.length > 0) {
                    if (textoTarefa.length > 50) {
                        textoTarefa = textoTarefa.substring(0, 50);
                    }
                    this.tarefas.push({ ...newTarefa, texto: textoTarefa, id: uuidv4() });
                    this.newTarefa = {
                        feito: false,
                        data: this.obterData(),
                        descricao: "",
                        texto: "",
                    };
                    this.armazenarTarefas();
                    this.atualizarCalendario();
                    this.showModalAdicionarTarefa = false;
                } else {
                    this.exibirModalErro = true;
                }
            } else {
                this.exibirModalPreenchimento = true;
            }
        },
        concluirTarefaCalendario(tarefa) {
            if (!tarefa.feito) {
                tarefa.feito = true;
                this.armazenarTarefas();
                this.tarefaEmVisualizacao = null;
                this.atualizarCalendario();
                this.modalConcluir = true;
                setTimeout(() => {
                    this.modalConcluir = false;
                }, 1500);
            }
        },
        getColor(prioridade) {
            switch (prioridade) {
                case 'Alta':
                    return '#ff4003';
                case 'Média':
                    return '#f59e0b';
                case 'Normal':
                default:
                    return '#007bff';
            }
        },
        compararPrioridade(eventA, eventB) {
            const prioridade = {
                'Alta': 1,
                'Média': 2,
                'Normal': 3,
            };
            return prioridade[eventA.extendedProps.task.prioridade] - prioridade[eventB.extendedProps.task.prioridade];
        },
        toggleModalOrientacoes() {
            this.showModalOrientacoes = !this.showModalOrientacoes;
            localStorage.setItem('showModalOrientacoes', JSON.stringify(this.showModalOrientacoes));
        },
        fecharModalOrientacoes() {
            this.showModalOrientacoes = false;
            localStorage.setItem('showModalOrientacoes', JSON.stringify(this.showModalOrientacoes));
        },
    },

    mounted() {
        const storedState = localStorage.getItem('showModalOrientacoes');
        if (storedState !== null) {
            this.showModalOrientacoes = JSON.parse(storedState);
        } else {
            this.showModalOrientacoes = true; // Define um valor padrão se não houver estado no localStorage
        }
    },


}
</script>
  
<style  lang="css">
.calendarioTitulo h1 {
    margin-bottom: 20px;
    text-align: center;
}

.calendarioContainer {
    width: 70%;
    margin: 0 auto;
}

.orientações {
    color: #9da3ae;
    cursor: pointer;
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

.fc-event-title {
    font-size: 16px;
    /* Ajuste o valor conforme necessário */
}

.fc-event {
    border-width: 2px;
    /* Ajuste o valor conforme necessário */
    border-style: solid;
    /* O estilo da borda, pode ser 'solid', 'dashed', etc. */
    border-color: inherit;
    /* Herda a cor da borda do evento */
}
</style>