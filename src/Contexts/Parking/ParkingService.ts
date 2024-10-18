import {BaseApi} from "../../service/base-api/baseApi";
import {ParkingInput, ParkingTypes} from "./ParkingTypes";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {ErrorResponse} from "../BaseType";

export class ParkingService {

  private readonly path = "/api/parking"
  private readonly api = new BaseApi().getApi('http://localhost:8080');

  async registerEntry(data: ParkingInput): Promise<ParkingTypes | ErrorResponse> {
    try {
      const response = await this.api.post(this.path + "/entry", data);
      return response.data;
    } catch (error: any) {
      return ErrorHandler.errorHandler("Error", error, {});
    }
  }

  async registerExit(data: ParkingInput): Promise<ParkingTypes | ErrorResponse> {
    try {
      const response = await this.api.put(this.path + "/exit", data);
      return response.data;
    } catch (error: any) {
      return ErrorHandler.errorHandler("Error", error, {});
    }
  }
}
