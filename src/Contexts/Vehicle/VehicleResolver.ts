import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { VehicleInput, VehicleMessage, VehicleTypes } from "./VehicleTypes";
import { VehicleService } from "./VehicleService";

@Resolver()
export class VehicleResolver {

  private readonly api = new VehicleService();

  @Query(() => [VehicleTypes])
  async getAllVehicle(): Promise<VehicleTypes> {
    return await this.api.getVehicles();
  }

  @Query(() => VehicleTypes)
  async getVehicle(
    @Arg("id") id: string
  ): Promise<VehicleTypes> {
    return await this.api.getVehicleById(id);
  }

  @Mutation(() => VehicleTypes)
  async createNewVehicle(
    @Arg("data") data: VehicleInput
  ): Promise<VehicleTypes> {
    return await this.api.saveVehicle(data);
  }

  @Mutation(() => VehicleTypes)
  async updateVehicle(
    @Arg("id") id: string,
    @Arg("data") data: VehicleInput
  ): Promise<VehicleTypes> {
    return await this.api.updateVehicle(id, data);
  }

  @Mutation(() => VehicleMessage)
  async deleteVehicle(
    @Arg("VehicleId") VehicleId: string
  ): Promise<VehicleMessage> {
    return await this.api.deleteVehicle(VehicleId);
  }
}
