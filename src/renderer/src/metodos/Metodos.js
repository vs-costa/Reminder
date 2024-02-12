import { v4 as uuidv4 } from 'uuid';

export default {

    data() {
        return {
            tarefas: [],
            showModal: false,
            tarefaEmEdicao: null,
            deletarTarefa: null,
            retornarTarefa: null,
            newTarefa: {
                feito: false,
                data: this.obterData(),
                descricao: '',
                texto: '',
                mostrarDescricao: false
            },
        }
    },
    methods: {
        adicionarTarefa() {
            if (this.newTarefa.texto && this.newTarefa.data) {
                let textoTarefa = this.newTarefa.texto;
                if (textoTarefa.length > 50) {
                    textoTarefa = textoTarefa.substring(0, 50);
                }
                this.tarefas.push({ ...this.newTarefa, texto: textoTarefa, id: uuidv4() });
                this.newTarefa = {
                    feito: false,
                    data: this.obterData(),
                    descricao: "",
                    texto: "",
                };
                this.armazenarTarefas();
                this.ordenarTarefasPorData();
                this.toogleModal();
            } else {
                alert("O título e data da tarefa são obrigatórios")
            }
        },
        armazenarTarefas() {
            localStorage.setItem("tarefas", JSON.stringify(this.tarefas))
        },
        obterData() {
            const dataAtual = new Date();
            const dia = String(dataAtual.getDate()).padStart(2, '0');
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
            const ano = dataAtual.getFullYear();

            return `${ano}-${mes}-${dia}`;
        },
        formatarData(data) {
            const [ano, mes, dia] = data.split('-');
            return `${dia}/${mes}/${ano}`;
        },
        ordenarTarefasPorData() {
            this.tarefas.sort((a, b) => {

                const dataA = new Date(a.data);
                const dataB = new Date(b.data);

                return dataA - dataB;
            });
        },
        isDataPassada(data) {
            const dataTarefa = new Date(data);
            const dataAtual = new Date();
            dataAtual.setDate(dataAtual.getDate() - 1);

            return dataTarefa < dataAtual;
        },
        concluirTarefa(tarefa) {
            if (!tarefa.feito) {
                tarefa.feito = true;
                this.armazenarTarefas();
                this.showModal = true;
                setTimeout(() => {
                    this.showModal = false;
                }, 1500);
            }
        },
        confirmarDeletar(tarefa) {
            this.deletarTarefa = { ...tarefa };
        },
        removerTarefa(tarefa) {
            const index = this.tarefas.findIndex(t => t.id === this.deletarTarefa.id);
            if (index !== -1) {
                this.tarefas.splice(index, 1);
                this.armazenarTarefas();
            }
            this.deletarTarefa = null
            this.$forceUpdate();
        },
        cancelarDelete() {
            this.deletarTarefa = null
        },
        toogleDescricao(id, lista) {
            const tarefa = lista.find(tarefa => tarefa.id === id);
            if (tarefa) {
                tarefa.mostrarDescricao = !tarefa.mostrarDescricao;
            }
        },
        abrirFormularioEdicao(tarefa) {
            this.tarefaEmEdicao = { ...tarefa };
        },
        editarTarefa() {
            const index = this.tarefas.findIndex(t => t.id === this.tarefaEmEdicao.id);
            if (index !== -1) {
                this.tarefas[index] = this.tarefaEmEdicao;
                this.armazenarTarefas();
                this.ordenarTarefasPorData();
            }
            this.tarefaEmEdicao = null;
            this.$forceUpdate();
        },
        cancelarEdicao() {
            this.tarefaEmEdicao = null;
        },
        atualizarTarefaNoCalendario(tarefaAtualizada) {
            const index = this.tarefas.findIndex(tarefa => tarefa.id === tarefaAtualizada.id);
            if (index !== -1) {
                this.tarefas[index] = tarefaAtualizada;
                this.armazenarTarefas();
            }
        },
    },

    created() {
        this.tarefas = localStorage.getItem("tarefas") ? JSON.parse(localStorage.getItem("tarefas")) : this.tarefas;
        this.ordenarTarefasPorData();
    },
}