# Projeto CRUD para Cafeteria

## Descrição do Projeto

Este projeto é um sistema de gerenciamento de compras para uma cafeteria, desenvolvido para permitir o cadastro, visualização, edição e exclusão de produtos e vendas. O objetivo principal é facilitar a administração do estoque e das vendas da cafeteria, garantindo uma gestão eficiente e precisa dos dados.


<img src="src\uploads\login.png">

## Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Framework/Libraries: React.js

- **Backend:**
  - Node.js
  - Express.js
  - MySQL

- **Ferramentas e Outros:**
  - Visual Studio Code
  - Postman (para testar as APIs)
  - Git e GitHub (controle de versão)
  - NPM (gerenciador de pacotes)

## Funcionalidades Principais

1. **Gestão de Produtos:**
   - Cadastro de novos produtos
   - Edição de produtos existentes
   - Exclusão de produtos (com confirmação via pop-up)
   - Visualização de todos os produtos

2. **Gestão de Vendas:**
   - Registro de novas vendas
   - Edição de vendas (atualização de informações de produto e status)
   - Exclusão de vendas
   - Visualização de todas as vendas

3. **Confirmação de Ações:**
   - Implementação de pop-ups de confirmação para exclusão e confirmação de ações importantes, garantindo que o usuário confirme antes de prosseguir.

4. **Autenticação e Autorização:**
   - Cadastro de usuários
   - Login de usuários
   - Recuperação de senha
   - Diferentes níveis de usuário (super-administrador, administrador e funcionário)

5. **Pagamentos:**
   - Integração com API de pagamentos para permitir o pagamento dos produtos


## O Que Eu Aprendi

Durante o desenvolvimento deste projeto CRUD para uma cafeteria, adquiri e aprimorei várias habilidades técnicas e interpessoais essenciais para um desenvolvedor full stack. Alguns dos principais aprendizados incluem:

### Habilidades Técnicas

1. **Desenvolvimento de APIs RESTful:**
   - Aprendi a criar, configurar e consumir APIs RESTful utilizando Node.js e Express.js, permitindo uma comunicação eficiente entre o frontend e o backend.

2. **Gerenciamento de Banco de Dados:**
   - Adquiri experiência na modelagem de banco de dados relacional com MySQL, incluindo a criação de tabelas, relacionamentos e execução de consultas complexas.

3. **Autenticação e Autorização:**
   - Implementei sistemas de autenticação e autorização, aprendendo a criar diferentes níveis de usuário (super-administrador, administrador e funcionário) e a proteger rotas específicas conforme as permissões de cada usuário.

4. **Integração com APIs Externas:**
   - Integrei o sistema com APIs externas, adquirindo habilidades na configuração e uso de serviços de terceiros para aumentar a funcionalidade da aplicação.

5. **Desenvolvimento Frontend com React:**
   - Fortaleci minhas habilidades com React.js, incluindo a criação de componentes reutilizáveis, gerenciamento de estado e otimização da responsividade da aplicação para diversos dispositivos.

6. **Gerenciamento de Arquivos e Uploads:**
   - Utilizei o multer para gerenciar o upload de arquivos, aprendendo a armazenar e manipular imagens de produtos de forma segura e eficiente.

7. **Implementação de Segurança:**
   - Aprendi a implementar medidas de segurança básicas, como hashing de senhas e gerenciamento seguro de sessões de usuário.

### Habilidades Interpessoais

1. **Gestão de Projetos:**
   - Aprendi a gerenciar o projeto de forma eficaz, utilizando listas de pendências e backlog para acompanhar o progresso e priorizar tarefas.

2. **Resolução de Problemas:**
   - Enfrentei e resolvi diversos desafios técnicos, desenvolvendo habilidades de troubleshooting e debug em diferentes camadas da aplicação.

3. **Aprendizado Contínuo:**
   - aprendi a pesquisar para aplicar as melhores práticas e ferramentas, integrando novos conhecimentos ao projeto conforme necessário.

Esses aprendizados não só enriqueceram minhas competências técnicas, mas também melhoraram minha capacidade de trabalhar de forma eficiente e independente em um ambiente de desenvolvimento ágil.


### Estrutura do Projeto

#### Frontend:

- **public/**: Arquivos públicos e estáticos, acessíveis diretamente pelo navegador.
  - **css/**: Arquivos de estilo CSS.
  - **script/**: Arquivos de scripts JavaScript.

- **src/**: Código fonte do frontend.
  - **views/**: Templates EJS para as páginas da aplicação.
    - **administracao/**: Páginas relacionadas à administração.
    - **compras/**: Páginas relacionadas às compras.
    - **enderecos/**: Páginas relacionadas aos endereços.
    - **produtos/**: Páginas relacionadas aos produtos.
    - Outras páginas (home.ejs, index.ejs, etc.).

#### Backend:

- **src/**: Código fonte do backend.
  - **controller/**: Controladores que gerenciam as requisições.
  - **infraestrutura/**: Arquivos relacionados à infraestrutura do backend.
  - **middlewares/**: Middlewares da aplicação.
  - **Model/**: Modelos de dados para interação com o banco de dados.
  - **rotas/**: Definição das rotas da API.
  - `index.js`: Arquivo principal do servidor.

- **uploads/**: Arquivos de upload, como imagens.

### Explicações Adicionais

- **public/**: Contém arquivos estáticos que são servidos diretamente ao cliente, como arquivos CSS e JavaScript.

- **src/views/**: Contém templates EJS que são renderizados no servidor e enviados para o cliente. Cada subpasta dentro de views corresponde a uma seção diferente da aplicação, facilitando a organização dos templates.

- **src/controller/**: Contém os controladores que lidam com a lógica das requisições HTTP, processando os dados e interagindo com os modelos.

- **src/infraestrutura/**: Contém arquivos que suportam a infraestrutura do backend, como configurações de banco de dados ou serviços externos.

- **src/middlewares/**: Contém middlewares, que são funções que processam as requisições antes de chegarem aos controladores. Um exemplo é o `authMiddleware.js`, que poderia verificar se o usuário está autenticado.

- **src/Model/**: Contém os modelos de dados que representam as entidades do banco de dados, facilitando a interação com os dados persistentes.

- **src/rotas/**: Define as rotas da API, mapeando URLs para os controladores correspondentes.

- **uploads/**: Contém arquivos enviados pelo usuário, como imagens de produtos ou logotipos.

- **index.js**: O arquivo principal do servidor, responsável por inicializar a aplicação e configurar as rotas e middleware.

Esta explicação mais detalhada ajuda a entender a função de cada diretório e arquivo dentro da estrutura do projeto, mantendo a clareza e organização necessária para desenvolvimento e manutenção.

## Como Executar o Projeto

1. **Clonar o Repositório:**
   - Clone o repositório para o seu ambiente local:
   exemplo pelo git:
     ```bash
     git clone <URL_DO_REPOSITORIO>
     cd <NOME_DA_PASTA_DO_REPOSITORIO>
     ```

2. **Instalar o Node.js e NPM:**
   - Certifique-se de ter o Node.js e o NPM (Node Package Manager) instalados. Caso não tenha, baixe e instale a partir do [site oficial do Node.js](https://nodejs.org/).   
   
3. **Inicializar o Projeto:**
   - Se ainda não existir um arquivo `package.json`, crie um com o comando:
     ```bash
     npm init -y
     ```

4. **Instalar os Pacotes Necessários:**
   - Instale os pacotes necessários para o projeto com os seguintes comandos:
     ```bash
     npm install express express-session ejs mysql multer connect-flash
     ```

5. **Instalar o Nodemon(opcional):**

   - **Globalmente (opcional):**
     - Instale o `nodemon` globalmente para usá-lo em qualquer projeto:
       ```bash
       npm install -g nodemon
       ```
     - **Iniciar o Projeto com Nodemon Globalmente:**
       - Use o comando:
         ```bash
         nodemon index.js
         ```
       - **Por quê:** O `nodemon` reinicia automaticamente o servidor quando há mudanças no código, o que é útil para desenvolvimento.

   - **Localmente (recomendado para o projeto):**
     - Instale o `nodemon` como uma dependência de desenvolvimento:
       ```bash
       npm install --save-dev nodemon
       ```
     - **Adicionar Script ao `package.json`:**
       - Adicione o seguinte script ao seu `package.json`:
         ```json
         "scripts": {
           "start": "nodemon index.js"
         }
         ```
     - **Iniciar o Projeto com Nodemon Localmente:**
       - Use o comando:
         ```bash
         npm start
         ```
     - **Por quê:** A instalação local garante que todos os colaboradores usem a mesma versão do `nodemon`, mantendo a consistência do ambiente de desenvolvimento.

6. **Executar o Projeto Sem Nodemon:**
   - Se preferir não usar o `nodemon`, inicie o servidor diretamente com o Node.js:
     ```bash
     node index.js
     ```

7. **Configurar o Banco de Dados:**
   - Conecte-se ao seu servidor MySQL e execute o script presente no arquivo `cafeteriaSQL.sql` para criar o banco de dados necessário. Ajuste as configurações de conexão no arquivo de configuração conforme necessário.

8. **Acessar o Projeto:**
   - O projeto estará disponível em `http://localhost:8080`.


## Pendências/Backlog

**Backend:**
~~1. Criar o 'cadastrar usuário'~~
~~2. Criar uma categoria de usuário: super-administrador~~
    ~~2.2. Criar 'um cadastrar administrador' (para super-administrador)~~
~~3. Criar um retirar administrador (para superadministrador)~~
~~4. Listar todas as compras~~
~~5. Exibição de mensagem ao usuário que tenta editar compra confirmada~~
~~6. Editar e excluir compra confirmada (administrador)~~
    ~~- Adicionar data da compra~~
~~7. Visualizar todas as compras (administrador)~~
~~8. Modificar o banco de dados para incluir email~~
~~9. Criar o 'esqueci a senha'~~ 
**10. Conectar uma API para enviar email com a senha**
~~11. Criar botão de entrar sem login~~  
~~12. Criar página para acessar os produtos sem fazer login~~
    ~~12.2. Direcionar para login ao clicar em comprar~~
**13. Conectar API de pagamentos para pagar o produto** 
~~14. Adicionar categorias: pedido em trânsito e pedido entregue~~
~~15. Alterar estado do pedido para em trânsito e para entregue~~
~~16. Adicionar categoria de usuário funcionário~~
~~17. Restringir administração de estado dos pedidos para funcionários~~
~~18. Alterar coluna ação para 'ver pedido'~~
    ~~18.2. Em ver pedido, opções editar, pagar e excluir~~

**19. Incluir endereço de entrega na venda**
    **19.2. Integrar API de CEP**
00. **Melhorar a segurança**
00. **Realizar testes**

**Frontend:**
1. ~~Melhorar os formulários~~  
    ~~1.1. Melhorar a visualização de compras~~  
~~2. Melhorar a responsividade~~  
3. ~~Adicionar logo da marca~~  
4. **Adicionar rodapé com nome e marca**  
5. ~~Condicionar as cores das células da coluna estado da tabela de compras para verde, amarelo e vermelho~~ 
6. ~~Revisar esquemas de cores~~  

## Pacotes Utilizados

Para o backend, os seguintes pacotes Node.js foram utilizados:
- express
- express-session
- ejs
- mysql
- multer
- connect-flash
- body-parser (dependendo da versão)

## Script SQL

Conecte-se a um servidor MySQL e execute o script encontrado no arquivo `cafeteriaSQL.sql` para criar o banco de dados necessário para o projeto.



## Contribuição

Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Contato:
Andre Corso Camara
[linkedin](https://www.linkedin.com/in/andre-corso-c%C3%A2mara/)
[email](devandrecorso@hotmail.com)


