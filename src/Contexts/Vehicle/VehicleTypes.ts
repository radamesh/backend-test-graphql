import {Field, InputType, ObjectType} from "type-graphql";

@ObjectType()
export class VehicleTypes {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  brand: string;

  @Field({ nullable: true })
  model: string;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  plate: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  createdAt: string;
}

@InputType()
export class VehicleInput {
  @Field({ nullable: true })
  brand: string;

  @Field({ nullable: true })
  model: string;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  plate: string;

  @Field({ nullable: true })
  type: string;
}

@ObjectType()
export class VehicleMessage {
  @Field()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}