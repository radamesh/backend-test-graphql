import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EstablishmentInput, EstablishmentMessage, EstablishmentTypes } from "./EstablishmentTypes";
import { EstablishmentService } from "./EstablishmentService";

@Resolver()
export class EstablishmentResolver {

  private readonly api = new EstablishmentService();

  @Query(() => [EstablishmentTypes])
  async getAllEstablishment(): Promise<EstablishmentTypes> {
    return await this.api.getAllEstablishments();
  }

  @Query(() => EstablishmentTypes)
  async getEstablishment(
    @Arg("id") id: string
  ): Promise<EstablishmentTypes> {
    return await this.api.getEstablishmentById(id);
  }

  @Mutation(() => EstablishmentTypes)
  async createNewEstablishment(
    @Arg("data") data: EstablishmentInput
  ): Promise<EstablishmentTypes> {
    return await this.api.saveEstablishment(data);
  }

  @Mutation(() => EstablishmentTypes)
  async updateEstablishment(
    @Arg("id") id: string,
    @Arg("data") data: EstablishmentInput
  ): Promise<EstablishmentTypes> {
    return await this.api.updateEstablishment(id, data);
  }

  @Mutation(() => EstablishmentMessage)
  async deleteEstablishment(
    @Arg("establishmentId") establishmentId: string
  ): Promise<EstablishmentMessage> {
    return await this.api.deleteEstablishment(establishmentId);
  }
}
