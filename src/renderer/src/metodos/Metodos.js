import { v4 as uuidv4 } from 'uuid';

export default {

    data() {
        return {
            tarefas: [],
            tarefaEmEdicao: null,
            deletarTarefa: null,
            modalConcluir: null,
            retornarTarefa: null,
            exibirModalErro: false,
            exibirModalPreenchimento: false,
            mostrarLegenda: true,
            mostrarOrientacao: true,
            newTarefa: {
                feito: false,
                data: this.obterData(),
                descricao: '',
                texto: '',
                prioridade: 'Normal',
                mostrarDescricao: false
            },
        }
    },
    methods: {
        adicionarTarefa() {
            if (this.newTarefa.texto && this.newTarefa.data) {
                let textoTarefa = this.newTarefa.texto.trim();
                if (textoTarefa.length > 0) {
                    if (textoTarefa.length > 50) {
                        textoTarefa = textoTarefa.substring(0, 50);
                    }
                    this.tarefas.push({ ...this.newTarefa, texto: textoTarefa, id: uuidv4() });
                    this.newTarefa = {
                        feito: false,
                        data: this.obterData(),
                        descricao: "",
                        texto: "",
                        prioridade: 'Normal',
                    };
                    this.armazenarTarefas();
                    this.ordenarTarefasPorData();
                } else {
                    this.exibirModalErro = true;
                }
            } else {
                this.exibirModalPreenchimento = true;
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
                const comparacaoData = dataA - dataB;

                if (comparacaoData === 0) {
                    const prioridadeOrdem = {
                        'Normal': 2,
                        'Média': 1,
                        'Alta': 0,
                    };
                    const prioridadeA = prioridadeOrdem[a.prioridade];
                    const prioridadeB = prioridadeOrdem[b.prioridade];

                    return prioridadeA - prioridadeB;
                }

                return comparacaoData;
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
                this.modalConcluir = true;
                setTimeout(() => {
                    this.modalConcluir = false;
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
        fecharModalErro() {
            this.exibirModalErro = false;
        },
        fecharModalPreenchimento() {
            this.exibirModalPreenchimento = false;
        },
        alternarLegenda() {
            this.mostrarLegenda = !this.mostrarLegenda;
            localStorage.setItem('mostrarLegenda', JSON.stringify(this.mostrarLegenda));
        },
    },

    created() {
        this.tarefas = localStorage.getItem("tarefas") ? JSON.parse(localStorage.getItem("tarefas")) : this.tarefas;
        this.ordenarTarefasPorData();
    },
    mounted() {
        const mostrarLegendaSalva = localStorage.getItem('mostrarLegenda');
        if (mostrarLegendaSalva !== null) {
            this.mostrarLegenda = JSON.parse(mostrarLegendaSalva);
        } else {
            this.mostrarLegenda = true;
        }
    },
}