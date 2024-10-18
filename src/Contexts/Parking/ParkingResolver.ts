import {Arg, Mutation, Resolver} from "type-graphql";
import {ParkingInput, ParkingTypes} from "./ParkingTypes";
import {ParkingService} from "./ParkingService";
import {ErrorResponse} from "../BaseType";

@Resolver()
export class ParkingResolver {

  private readonly api = new ParkingService();

  @Mutation(() => ParkingTypes)
  async newRegisterEntry(
    @Arg("data") data: ParkingInput
  ): Promise<ParkingTypes | ErrorResponse> {
    return this.api.registerEntry(data);
  }

  @Mutation(() => ParkingTypes)
  async registerExit(
    @Arg("data") data:ParkingInput
  ): Promise<ParkingTypes | ErrorResponse> {
    return this.api.registerExit(data);
  }
}