import GatoModel from "../models/gatoModel.js";

class GatoController {
  // GET /api/gatos
  async getAllGatos(req, res) {
    try {
      const gatos = await GatoModel.findAll();
      res.json(gatos);
    } catch (error) {
      console.error("Erro ao buscar gatos:", error);
      res.status(500).json({ error: "Erro ao buscar gatos" });
    }
  }

  // GET /api/gatos/:id
  async getGatoById(req, res) {
    try {
      const { id } = req.params;

      const gato = await GatoModel.findById(id);

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
      const { raça, diferenças, tempoDeVida } = req.body;

      // Verifica se todos os campos obrigatórios foram fornecidos
      if (!raça || !diferenças || !tempoDeVida) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      const newGato = await GatoModel.create(raça, diferenças, tempoDeVida);

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
      const { raça, diferenças, tempoDeVida } = req.body;

      const updatedGato = await GatoModel.update(id, raça, diferenças, tempoDeVida);

      if (!updatedGato) {
        return res.status(404).json({ error: "Gato não encontrado" });
      }

      res.json(updatedGato);
    } catch (error) {
      console.error("Erro ao atualizar gato:", error);
      res.status(500).json({ error: "Erro ao atualizar gato" });
    }
  }

  // DELETE /api/gatos/:id
  async deleteGato(req, res) {
    try {
      const { id } = req.params;

      const result = await GatoModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Gato não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover gato:", error);
      res.status(500).json({ error: "Erro ao remover gato" });
    }
  }
}

export default new GatoController();