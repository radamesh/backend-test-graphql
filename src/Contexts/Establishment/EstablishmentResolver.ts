import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EstablishmentInput, EstablishmentMessage, EstablishmentTypes } from "./EstablishmentTypes";
import { EstablishmentService } from "./EstablishmentService";
import {ErrorResponse} from "../BaseType";

@Resolver()
export class EstablishmentResolver {

  private readonly api = new EstablishmentService();

  @Query(() => [EstablishmentTypes])
  async getAllEstablishment(): Promise<EstablishmentTypes> {
    return await this.api.getAllEstablishments();
  }

  @Query(() => EstablishmentTypes)
  async getEstablishment(
    @Arg("establishmentId") establishmentId: string
  ): Promise<EstablishmentTypes | ErrorResponse> {
    return await this.api.getEstablishmentById(establishmentId);
  }

  @Mutation(() => EstablishmentTypes)
  async createNewEstablishment(
    @Arg("data") data: EstablishmentInput
  ): Promise<EstablishmentTypes | ErrorResponse> {
    return await this.api.saveEstablishment(data);
  }

  @Mutation(() => EstablishmentTypes)
  async updateEstablishment(
    @Arg("establishmentId") establishmentId: string,
    @Arg("data") data: EstablishmentInput
  ): Promise<EstablishmentTypes | ErrorResponse> {
    return await this.api.updateEstablishment(establishmentId, data);
  }

  @Mutation(() => EstablishmentMessage)
  async deleteEstablishment(
    @Arg("establishmentId") establishmentId: string
  ): Promise<EstablishmentMessage | ErrorResponse> {
    return await this.api.deleteEstablishment(establishmentId);
  }
}
