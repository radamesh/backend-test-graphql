import {Field, InputType, ObjectType} from "type-graphql";

@ObjectType()
export class EstablishmentTypes {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  cnpj: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  spacesForMotorcycles: string;

  @Field({ nullable: true })
  spacesForCars: string;

  @Field({ nullable: true })
  createdAt: string;
}

@InputType()
export class EstablishmentInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  cnpj: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  spacesForMotorcycles: string;

  @Field({ nullable: true })
  spacesForCars: string;
}

@ObjectType()
export class EstablishmentMessage {
  @Field()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
