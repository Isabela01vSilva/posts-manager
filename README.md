# Projeto Angular – CRUD de Posts e Comentários

## Sobre o projeto

Este projeto é uma aplicação web desenvolvida em **Angular** com o objetivo de demonstrar a implementação de um **CRUD completo de posts e comentários**, aplicando boas práticas de arquitetura, organização de código e programação reativa.

A aplicação permite **criar, listar, editar e excluir posts**, além de gerenciar comentários associados a cada post.

## Stack utilizada

* **Linguagem**: TypeScript
* **Framework**: Angular
* **Estilização**: Tailwind CSS
* **Programação reativa**: RxJS
* **Formulários**: Reactive Forms
* **Comunicação com API**: HttpClient (REST)
* **API utilizada**: JSONPlaceholder

---

## Próximos passos

- Implementar testes unitários com **Jasmine e Karma**
- Migrar persistência de dados para **Firebase**
- Adicionar tratamento global de erros
- Implementar paginação e otimização de performance

---

## Requisitos

* **Node.js** v22+
* **Angular CLI** v19+
* **TypeScript**
* **Gerenciador de pacotes**: npm
* **API externa**: JSONPlaceholder (REST)
* **Navegador**: Compatível com navegadores modernos (testado no Opera)

---

## Passos para rodar o projeto

1. Clone o repositório:

```bash
https://github.com/Isabela01vSilva/posts-manager.git
```

2. Acesse a pasta do projeto:

```bash
cd posts-manager
```

3. Instale as dependências:

```bash
npm i
```

4. Rode a aplicação Angular:

```bash
ng serve
```

5. Acesse no navegador:

```
http://localhost:4200
```

---

## Decisões e trade-offs

### Decisões

* Utilização de **RxJS com async pipe**, evitando `subscribe` manual
* **Services desacoplados** para facilitar manutenção e troca de API
* Uso de **Tailwind CSS** para agilidade no desenvolvimento
* Estrutura preparada para **integração futura com Firebase**

---

### Trade-offs

- Não utilização de **NgRx**, reduzindo a complexidade inicial e facilitando o entendimento do fluxo de dados
- Utilização de uma **API externa (JSONPlaceholder)** para simular o backend, em vez de um backend próprio
- Persistência de dados limitada, sem armazenamento offline
- **Firebase considerado como solução de persistência**, porém não implementado nesta etapa devido a restrições de tempo, ficando planejado como melhoria futura

---

##  Testes

A implementação de testes automatizados está planejada como **etapa futura do projeto**.

### Testes unitários (planejado)

- **Framework de testes**: Jasmine
- **Test runner**: Karma
- **Escopo previsto**:
  - Componentes
  - Services
  - Formulários e validações

### Testes manuais (atual)

Atualmente, a aplicação pode ser validada manualmente por meio das seguintes ações:

- Criar, editar e excluir posts
- Criar, editar e excluir comentários
- Validar o comportamento após recarregar a página
- Verificar estados de loading e erro

---

##  Deploy

O deploy da aplicação está planejado como um **próximo passo do projeto**.

- **Plataformas consideradas**: Vercel, Firebase Hosting ou Netlify
- **Ambiente**: Produção

**Link do deploy**:  
_A ser disponibilizado_

---

##  Autora

**Isabela Silva**
