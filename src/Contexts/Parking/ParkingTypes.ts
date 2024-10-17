import {Field, InputType, ObjectType} from "type-graphql";

@ObjectType()
export class ParkingTypes {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  vehicle: string;

  @Field({ nullable: true })
  plate: string;

  @Field({ nullable: true })
  establishment: string;

  @Field({ nullable: true })
  estacionado: Boolean;

  @Field({ nullable: true })
  payment: string;

  @Field({ nullable: true })
  entryTime: string;

  @Field({ nullable: true })
  exitTime: string;
}

@InputType()
export class ParkingInput {
  @Field({ nullable: true })
  vehicle: string;

  @Field({ nullable: true })
  plate: string;

  @Field({ nullable: true })
  establishment: string;

  @Field({ nullable: true })
  estacionado: Boolean;

  @Field({ nullable: true })
  payment: string;

  @Field({ nullable: true })
  entryTime: string;

  @Field({ nullable: true })
  exitTime: string;
}
