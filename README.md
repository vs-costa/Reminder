# Reminder - Aplicativo de Gerenciamento de Tarefas



## Visão Geral

**Reminder** é um aplicativo de gerenciamento de tarefas desenvolvido em Vue.js e Electron, proporcionando uma experiência desktop para organização pessoal. Este projeto surgiu da minha paixão por aplicativos de gerenciamento de tarefas e do desejo de aprimorar minhas habilidades em Vue.js e explorar o Electron para criar um aplicativo desktop funcional.

## Funcionalidades

### Página Inicial

<img src="https://github.com/vs-costa/Reminder/blob/master/screenshots/Lista%20de%20Tarefas.png" alt="Lista de Tarefas" width="1080"/>

A Página Inicial serve como um gerenciador simples de tarefas, onde é possível:

- Adicionar tarefas com título, prioridade, data e descrição.
- Visualizar as tarefas organizadas por data e prioridade.
- Destacar automaticamente tarefas atrasadas em vermelho.
- Acessar a descrição completa da tarefa ao clicar no título.

Ao lado direito de cada tarefa, há três botões:

- **Concluir**: Marca a tarefa como concluída e a remove da página inicial.
- **Editar**: Permite a edição das informações da tarefa.
- **Excluir**: Apaga permanentemente a tarefa da lista.

### Página Tarefas Concluídas

<img src="https://github.com/vs-costa/Reminder/blob/master/screenshots/Tarefas%20Conclu%C3%ADdas.png" alt="Tarefas Concluídas" width="1080"/>

Após concluir uma tarefa, ela é transferida automaticamente para esta página, que apresenta uma lista das tarefas concluídas. Funcionalidades incluem:

- Botão "Restaurar" para retornar uma tarefa à página inicial.
- Botão "Limpar Tarefas Concluídas" para remover permanentemente todas as tarefas concluídas.

### Calendário

<img src="https://github.com/vs-costa/Reminder/blob/master/screenshots/Calendario.png" alt="Tarefas Concluídas" width="1080"/>

O Calendário oferece uma visualização alternativa e interativa das tarefas:

- Cada tarefa é exibida na data correspondente com a borda colorida pela prioridade.
- Possibilidade de cadastrar tarefas diretamente clicando na data desejada.
- Arraste e solte para modificar a data de uma tarefa.
- Modal de detalhes ao clicar em uma tarefa, com opções de concluir, editar e excluir.

## Instalação

Para utilizar o **Reminder**, siga os passos abaixo:

1. Clone este repositório.
2. Instale as dependências com `npm install`.
3. Inicie o aplicativo com `npm run dev`.

## Contribuição

Sinta-se à vontade para contribuir, abrir issues ou sugerir melhorias. Toda colaboração é bem-vinda!

## Licença

Este projeto está sob a licença [MIT](LICENSE).
