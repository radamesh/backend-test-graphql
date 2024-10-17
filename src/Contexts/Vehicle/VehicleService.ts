import {BaseApi} from "../../service/base-api/baseApi";
import {VehicleInput, VehicleMessage, VehicleTypes} from "./VehicleTypes";

export class VehicleService {

  private readonly path = "/api/vehicle"
  private readonly api = new BaseApi().getApi('http://localhost:8080');

  async getVehicles(): Promise<VehicleTypes> {
    const response = await this.api.get(this.path);
    return response.data;
  }

  async getVehicleById(id: string): Promise<VehicleTypes> {
    const response = await this.api.get(this.path + id);
    return response.data;
  }

  async saveVehicle(data: VehicleInput): Promise<VehicleTypes> {
    const response = await this.api.post(this.path, data);
    return response.data;
  }

  async updateVehicle(id: string, data: VehicleInput): Promise<VehicleTypes> {
    const response = await this.api.put(this.path + id, data);
    return response.data;
  }

  async deleteVehicle(id: string) {
    const response = await this.api.delete(this.path + id);
    if (response.data.status === 200) {
      return new VehicleMessage("Veiculo excluído com sucesso.");
    } else {
      return new VehicleMessage("Veiculo não existe na base.");
    }
  }
}
