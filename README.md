# Tutorial: Criando um Backend Node.js para Gerenciamento de Raças de Gato

Este tutorial vai te guiar na criação de uma API REST para gerenciar uma coleção de raças de gatos, utilizando Node.js com Express. Vamos construir um CRUD completo seguindo uma arquitetura organizada com routes, controllers e models, usando um array em memória para armazenar os dados.

## Capacidades Técnicas Trabalhadas

- Utilizar paradigma da programação orientada a objetos
- Definir os elementos de entrada, processamento e saída para a programação da aplicação web
- Utilizar design patterns no desenvolvimento da aplicação web
- Definir os frameworks a serem utilizados no desenvolvimento da aplicação web
- Desenvolver API (web services) para integração de dados entre plataformas

## Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- Um editor de código (VS Code recomendado)
- Conhecimentos básicos de JavaScript e Node.js

## Vamos começar!

### Passo 1: Inicializar o projeto

Crie uma pasta para o projeto e inicialize:

```bash
mkdir racas-gato-api
cd racas-gato-api
npm init
```

### Passo 2: Instalar dependências

```bash
npm install express nodemon dotenv
```

### Passo 3: Configurar o arquivo package.json

Modifique o arquivo `package.json` para incluir os scripts:

```json
{
  "name": "racas-gato-api",
  "version": "1.0.0",
  "description": "API para gerenciamento de raças de gatos",
  "keywords": ["nodejs", "javascript", "express"],
  "license": "MIT",
  "author": "Nicole Cau",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "dotenv": "^16.4.7",
    "express": "^5.1.0",
    "nodemon": "^3.1.9"
  }
}
```

### Passo 4: Criar o arquivo .gitignore

Adicionar o seguinte conteúdo ao arquivo `.gitignore`:

```
node_modules
.env
```

### Passo 5: Configurar o ambiente com dotenv

Crie um arquivo `.env` na raiz do projeto:

```
PORT=4000
```

### Passo 6: Criar o servidor Express

Crie o arquivo `src/server.js`:

```javascript
import express from "express";
import { config } from "dotenv";

config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de Raças de Gato funcionando!" });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
```

### Passo 7: Criar o modelo Raca (usando array em memória)

Crie o arquivo `src/models/racaModel.js`:

```javascript
// Array para armazenar as raças em memória
let racas = [
  {
    id: 1,
    nome: "Siamês",
    origem: "Tailândia",
    expectativaDeVida: "12-15 anos",
    descricao: "Raça elegante, de olhos azuis e personalidade vocal.",
    pelagem: "Curta",
    corPadrao: "Seal point",
    imagemUrl: "https://example.com/siames.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    nome: "Maine Coon",
    origem: "Estados Unidos",
    expectativaDeVida: "10-13 anos",
    descricao: "Uma das maiores raças, dócil e peluda.",
    pelagem: "Longa",
    corPadrao: "Marrom rajado",
    imagemUrl: "https://example.com/mainecoon.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let nextId = 3;

class RacaModel {
  findAll() {
    return racas;
  }

  findById(id) {
    return racas.find((raca) => raca.id === Number(id)) || null;
  }

  create(nome, origem, expectativaDeVida, descricao, pelagem, corPadrao, imagemUrl) {
    const newRaca = {
      id: nextId++,
      nome,
      origem,
      expectativaDeVida,
      descricao,
      pelagem,
      corPadrao,
      imagemUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    racas.push(newRaca);
    return newRaca;
  }

  update(id, nome, origem, expectativaDeVida, descricao, pelagem, corPadrao, imagemUrl) {
    const raca = this.findById(id);
    if (!raca) return null;

    raca.nome = nome || raca.nome;
    raca.origem = origem || raca.origem;
    raca.expectativaDeVida = expectativaDeVida || raca.expectativaDeVida;
    raca.descricao = descricao || raca.descricao;
    raca.pelagem = pelagem || raca.pelagem;
    raca.corPadrao = corPadrao || raca.corPadrao;
    raca.imagemUrl = imagemUrl || raca.imagemUrl;
    raca.updatedAt = new Date();

    return raca;
  }

  delete(id) {
    const raca = this.findById(id);
    if (!raca) return null;
    racas = racas.filter((raca) => raca.id !== Number(id));
    return true;
  }
}

export default new RacaModel();
```

### Passo 8: Criar o controlador de Raças

Crie o arquivo `src/controllers/racaController.js`:

```javascript
import RacaModel from "../models/racaModel.js";

class RacaController {
  getAllRacas(req, res) {
    try {
      const racas = RacaModel.findAll();
      res.json(racas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar raças" });
    }
  }

  getRacaById(req, res) {
    try {
      const { id } = req.params;
      const raca = RacaModel.findById(id);
      if (!raca) {
        return res.status(404).json({ error: "Raça não encontrada" });
      }
      res.json(raca);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar raça" });
    }
  }

  createRaca(req, res) {
    try {
      const { nome, origem, expectativaDeVida, descricao, pelagem, corPadrao, imagemUrl } = req.body;
      if (
        !nome ||
        !origem ||
        !expectativaDeVida ||
        !descricao ||
        !pelagem ||
        !corPadrao ||
        !imagemUrl
      ) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }
      const newRaca = RacaModel.create(
        nome,
        origem,
        expectativaDeVida,
        descricao,
        pelagem,
        corPadrao,
        imagemUrl
      );
      res.status(201).json(newRaca);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar raça" });
    }
  }

  updateRaca(req, res) {
    try {
      const { id } = req.params;
      const { nome, origem, expectativaDeVida, descricao, pelagem, corPadrao, imagemUrl } = req.body;
      const updatedRaca = RacaModel.update(
        id,
        nome,
        origem,
        expectativaDeVida,
        descricao,
        pelagem,
        corPadrao,
        imagemUrl
      );
      if (!updatedRaca) {
        return res.status(404).json({ error: "Raça não encontrada" });
      }
      res.json(updatedRaca);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar raça" });
    }
  }

  deleteRaca(req, res) {
    try {
      const { id } = req.params;
      const result = RacaModel.delete(id);
      if (!result) {
        return res.status(404).json({ error: "Raça não encontrada" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Erro ao remover raça" });
    }
  }
}

export default new RacaController();
```

### Passo 9: Criar as rotas

Crie o arquivo `src/routes/racaRoutes.js`:

```javascript
import express from "express";
import RacaController from "../controllers/racaController.js";

const router = express.Router();

router.get("/", RacaController.getAllRacas);
router.get("/:id", RacaController.getRacaById);
router.post("/", RacaController.createRaca);
router.put("/:id", RacaController.updateRaca);
router.delete("/:id", RacaController.deleteRaca);

export default router;
```

### Passo 10: Iniciar o servidor

```bash
npm run dev
```

## Testando a API

Agora você pode testar o CRUD completo usando ferramentas como Postman, Insomnia ou Thunder Client:

### 1. Criar uma raça (POST /api/racas)

```json
{
  "nome": "Persa",
  "origem": "Irã",
  "expectativaDeVida": "12-17 anos",
  "descricao": "Gato de pelagem longa, dócil e tranquilo.",
  "pelagem": "Longa",
  "corPadrao": "Branco",
  "imagemUrl": "https://example.com/persa.jpg"
}
```

### 2. Listar todas as raças (GET /api/racas)

### 3. Obter uma raça específica (GET /api/racas/:id)

### 4. Atualizar uma raça (PUT /api/racas/:id)

```json
{
  "descricao": "Gato de pelagem longa, dócil, tranquilo e muito popular."
}
```

### 5. Remover uma raça (DELETE /api/racas/:id)

## Explicação do Projeto

Neste projeto, seguimos boas práticas como arquitetura MVC, organização de código, armazenamento em memória, tratamento de erros e validação básica de dados.

## Próximos Passos

- Adicionar autenticação e autorização
- Implementar paginação e filtros
- Usar validação avançada com Joi ou Zod
- Adicionar testes automatizados
- Documentar a API com Swagger

Agora você tem uma API REST completa para gerenciamento de raças de gatos usando Node.js e Express!