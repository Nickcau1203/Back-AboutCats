import prisma from "../../prisma/prisma.js";

class GatoModel {
  // Obter todos os gatos
  async findAll() {
    const gatos = await prisma.gato.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return gatos;
  }

  // Obter um gato pelo ID
  async findById(id) {
    const gato = await prisma.gato.findUnique({
      where: {
        id: Number(id),
      },
    });

    return gato;
  }

  // Criar um novo gato
  async create(raça, diferenças, tempoDeVida) {
    const newGato = await prisma.gato.create({
      data: {
        raça,
        diferenças,
        tempoDeVida,
      },
    });

    return newGato;
  }

  // Atualizar um gato
  async update(id, raça, diferenças, tempoDeVida) {
    const gato = await this.findById(id);

    if (!gato) {
      return null;
    }

    // Atualize o gato existente com os novos dados
    const data = {};
    if (raça !== undefined) {
      data.raça = raça;
    }
    if (diferenças !== undefined) {
      data.diferenças = diferenças;
    }
    if (tempoDeVida !== undefined) {
      data.tempoDeVida = tempoDeVida;
    }

    const gatoUpdated = await prisma.gato.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return gatoUpdated;
  }

  // Remover um gato
  async delete(id) {
    const gato = await this.findById(id);

    if (!gato) {
      return null;
    }

    await prisma.gato.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new GatoModel();