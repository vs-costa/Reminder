

export default {

    data() {
        return {
            tarefas: [],
            tarefasConcluidas: [],
            showModal: false,
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
            if (this.newTarefa.texto) {
                this.tarefas.push({ ...this.newTarefa });
                this.newTarefa = {
                    feito: false,
                    data: this.obterData(),
                    descricao: "",
                    texto: "",
                };
                this.armazenarTarefas();
                this.ordenarTarefasPorData();
            } else {
                alert("O título da tarefa é obrigatório")
            }
        },
        armazenarTarefas() {
            localStorage.setItem("tarefas", JSON.stringify(this.tarefas))
        },
        
        obterData() {
            const dataAtual = new Date();
            const dia = String(dataAtual.getDate()).padStart(2, '0');
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Adicione +1 aqui para obter o mês correto
            const ano = dataAtual.getFullYear();

            return `${dia}/${mes}/${ano}`;
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
            return dataTarefa < dataAtual;
        },
        concluirTarefa(index) {
            if (!this.tarefas[index].feito) {
                this.tarefas[index].feito = true;
                this.armazenarTarefas();
                this.showModal = true;
                setTimeout(() => {
                    this.showModal = false;
                }, 1500);
            }
        },
        armazenarTarefasConcluidas() {
            localStorage.setItem("tarefasConcluidas", JSON.stringify(this.tarefasConcluidas));
        },
        confirmarRemocao(index) {
            if (confirm(`Você deseja remover a tarefa "${this.tarefas[index].texto}"?`)) {
                this.removerTarefa(index);
            }
        },
        removerTarefa(index) {
            this.tarefas.splice(index, 1);
            this.armazenarTarefas();
        },
        toogleDescricao(index) {
            this.tarefas[index].mostrarDescricao = !this.tarefas[index].mostrarDescricao;
        },
    },

    


    created() {
        this.tarefas = localStorage.getItem("tarefas") ? JSON.parse(localStorage.getItem("tarefas")) : this.tarefas;
        this.ordenarTarefasPorData(); // Ordenar tarefas quando a página é carregada
    },
}