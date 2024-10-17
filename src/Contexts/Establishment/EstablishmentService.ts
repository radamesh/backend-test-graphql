import {BaseApi} from "../../service/base-api/baseApi";
import {EstablishmentInput, EstablishmentMessage, EstablishmentTypes} from "./EstablishmentTypes";

export class EstablishmentService {

  private readonly api = new BaseApi().getApi('http://localhost:8080');

  async getAllEstablishments(): Promise<EstablishmentTypes> {
    const response = await this.api.get("/api/establishment");
    return response.data;
  }

  async getEstablishmentById(id: string): Promise<EstablishmentTypes> {
    const response = await this.api.get("/api/establishment" + id);
    return response.data;
  }

  async saveEstablishment(data: EstablishmentInput): Promise<EstablishmentTypes> {
    const response = await this.api.post("/api/establishment", data);
    return response.data;
  }

  async updateEstablishment(id: string, data: EstablishmentInput): Promise<EstablishmentTypes> {
    const response = await this.api.put("/api/establishment/" + id, data);
    return response.data;
  }

  async deleteEstablishment(id: string) {
    const response = await this.api.delete("/api/establishment/" + id);
    if (response.data.status === 200) {
      return new EstablishmentMessage("Estabelecimento excluído com sucesso.");
    } else {
      return new EstablishmentMessage("Estabelecimento não existe na base.");
    }
  }
}
