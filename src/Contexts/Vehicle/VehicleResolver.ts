import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { VehicleInput, VehicleMessage, VehicleTypes } from "./VehicleTypes";
import { VehicleService } from "./VehicleService";
import {ErrorResponse} from "../BaseType";

@Resolver()
export class VehicleResolver {

  private readonly api = new VehicleService();

  @Query(() => [VehicleTypes])
  async getAllVehicle(): Promise<VehicleTypes | ErrorResponse> {
    return await this.api.getVehicles();
  }

  @Query(() => VehicleTypes)
  async getVehicle(
    @Arg("vehicleId") vehicleId: string
  ): Promise<VehicleTypes | ErrorResponse> {
    return await this.api.getVehicleById(vehicleId);
  }

  @Mutation(() => VehicleTypes)
  async createNewVehicle(
    @Arg("data") data: VehicleInput
  ): Promise<VehicleTypes | ErrorResponse> {
    return await this.api.saveVehicle(data);
  }

  @Mutation(() => VehicleTypes)
  async updateVehicle(
    @Arg("vehicleId") vehicleId: string,
    @Arg("data") data: VehicleInput
  ): Promise<VehicleTypes | ErrorResponse> {
    return await this.api.updateVehicle(vehicleId, data);
  }

  @Mutation(() => VehicleMessage)
  async deleteVehicle(
    @Arg("vehicleId") vehicleId: string
  ): Promise<VehicleMessage | ErrorResponse> {
    return await this.api.deleteVehicle(vehicleId);
  }
}
