import GatoModel from "../models/gatoModel.js";

class GatoController {
  // GET /api/gatos
  async getAllGatos(req, res) {
    try {
      const gato = await GatoModel.findAll();
      res.json(gato);
    } catch (error) {
      console.error("Erro ao buscar gatos:", error);
      res.status(500).json({ error: "Erro ao buscar gatos" });
    }
  }

  // GET /api/gatos/:id
  async getGatoById(req, res) {
    try {
      const { id } = req.params;
      const gato = await GatoModel.findByPk(id);
      if (!gato) {
        return res.status(404).json({ error: "Gato não encontrado" });
      }
      res.json(gato);
    } catch (error) {
      console.error("Erro ao buscar gato:", error);
      res.status(500).json({ error: "Erro ao buscar gato" });
    }
  }

  // POST /api/gatos
  async createGato(req, res) {
    try {
      const { raca, diferencas, tempoDeVida } = req.body;
      if (!raca || !diferencas || !tempoDeVida) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }
      const newGato = await GatoModel.create({ raca, diferencas, tempoDeVida });
      res.status(201).json(newGato);
    } catch (error) {
      console.error("Erro ao criar gato:", error);
      res.status(500).json({ error: "Erro ao criar gato" });
    }
  }

  // PUT /api/gatos/:id
  async updateGato(req, res) {
    try {
      const { id } = req.params;
      const { raca, diferencas, tempoDeVida } = req.body;
      const gato = await GatoModel.findByPk(id);
      if (!gato) {
        return res.status(404).json({ error: "Gato não encontrado" });
      }
      await gato.update({ raca, diferencas, tempoDeVida });
      res.json(gato);
    } catch (error) {
      console.error("Erro ao atualizar gato:", error);
      res.status(500).json({ error: "Erro ao atualizar gato" });
    }
  }

  // DELETE /api/gatos/:id
  async deleteGato(req, res) {
    try {
      const { id } = req.params;
      const gato = await GatoModel.findByPk(id);
      if (!gato) {
        return res.status(404).json({ error: "Gato não encontrado" });
      }
      await gato.destroy();
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao remover gato:", error);
      res.status(500).json({ error: "Erro ao remover gato" });
    }
  }
}

export default new GatoController();