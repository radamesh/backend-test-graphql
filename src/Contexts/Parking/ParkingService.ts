import {BaseApi} from "../../service/base-api/baseApi";
import {ParkingInput, ParkingTypes} from "./ParkingTypes";

export class ParkingService {

  private readonly path = "/api/parking"
  private readonly api = new BaseApi().getApi('http://localhost:8080');

  async registerEntry(data: ParkingInput): Promise<ParkingTypes> {
    const response = await this.api.post(this.path + "/entry", data);
    return response.data;
  }

  async registerExit(data: ParkingInput): Promise<ParkingTypes> {
    const response = await this.api.put(this.path + "/exit", data);
    return response.data;
  }
}
