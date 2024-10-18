import {BaseApi} from "../../service/base-api/baseApi";
import {VehicleInput, VehicleMessage, VehicleTypes} from "./VehicleTypes";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {ErrorResponse} from "../BaseType";

export class VehicleService {

  private readonly path = "/api/vehicle"
  private readonly api = new BaseApi().getApi('http://localhost:8080');

  async getVehicles(): Promise<VehicleTypes | ErrorResponse> {
    try {
      const response = await this.api.get(this.path);
      return response.data;
    } catch (error: any) {
      return ErrorHandler.errorHandler("Error", error, {});
    }
  }

  async getVehicleById(id: string): Promise<VehicleTypes | ErrorResponse> {
    try {
      const response = await this.api.get(this.path + "/" + id);
      return response.data;
    } catch (error: any) {
      return ErrorHandler.errorHandler("Error", error, {});
    }
  }

  async saveVehicle(data: VehicleInput): Promise<VehicleTypes | ErrorResponse> {
    try {
      const response = await this.api.post(this.path, data);
      return response.data;
    } catch (error: any) {
      return ErrorHandler.errorHandler("Error", error, {});
    }
  }

  async updateVehicle(id: string, data: VehicleInput): Promise<VehicleTypes | ErrorResponse> {
    try {
      const response = await this.api.put(this.path +"/"+ id, data);
      return response.data;
    } catch (error: any) {
      return ErrorHandler.errorHandler("Error", error, {});
    }
  }

  async deleteVehicle(id: string): Promise<VehicleMessage | ErrorResponse> {
    try {
      const response = await this.api.delete(this.path  + "/" + id);
      if (response.data.status === 200) {
        return new VehicleMessage("Veiculo excluído com sucesso.");
      } else {
        return new VehicleMessage("Veiculo não existe na base.");
      }
    } catch (error: any) {
      return ErrorHandler.errorHandler("Error", error, {});
    }
  }
}
