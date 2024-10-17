import {Arg, Mutation, Resolver} from "type-graphql";
import {ParkingInput, ParkingTypes} from "./ParkingTypes";
import {ParkingService} from "./ParkingService";

@Resolver()
export class ParkingResolver {

  private readonly api = new ParkingService();

  @Mutation(() => ParkingTypes)
  async newRegisterEntry(
    @Arg("data") data: ParkingInput
  ): Promise<ParkingTypes> {
    return this.api.registerEntry(data);
  }

  @Mutation(() => ParkingTypes)
  async registerExit(
    @Arg("data") data:ParkingInput
  ): Promise<ParkingTypes> {
    return this.api.registerExit(data);
  }
}