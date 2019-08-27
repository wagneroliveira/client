# Teste ClientePL

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5. e [Material Angular](https://material.angular.io)


**Objetivo:**
  CRUD utilizando as tecnologia (NodeJS, Angular, MongoDB)


### Pré-Requisitos

* Node 9x ou superior
* Mongo 4.x


## Executar aplicação automático com **Docker**

### Pré-Requisitos (Instalar)

* Docker
* Docker Compose

### Executando os containers (Docker)

Usando um terminal execute o script rundockerized.sh que esta na raiz do projeto.

```
$ ./rundockerized.sh
```

Ao finalizar os script o docker irá subir 3 containers abaixo:

```
$ sudo docker ps
```

*  api-backend
*  api-frontend
*  mongodb

### Executar aplicação manualmente

Acesse o diretório *clientPL* e execute os seguintes comandos:

Editar o arquivo de conexão app.js linha 13 (de mongodb para localhost)
```
$ cd server/
$ vim app.js
$ node app.js
```

Backend:
```
# Instalar dependência que esta na raiz do projeto:
$ cd server/
$ npm install
$ node app.js
```

Lista de chamadas API para o backEnd:

*  GET -     http://localhost:3000/clients/
*  POST -    http://localhost:3000/clients/
*  PACTH -   http://localhost:3000/clients/id
*  DELETE -  http://localhost:3000/clients/id


Frontend:
```
# Instalar dependência que esta na raiz do projeto:
$ npm install
$ npm start
```

Quando finalizar a execução aguarde alguns minutos verifique em http://localhost:4200/ se os serviços foram iniciados corretamente.

