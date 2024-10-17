import { NonEmptyArray } from "type-graphql";
import { EstablishmentResolver } from "./Establishment/EstablishmentResolver";
import {VehicleResolver} from "./Vehicle/VehicleResolver";
import {ParkingResolver} from "./Parking/ParkingResolver";

export const resolvers: NonEmptyArray<Function> = [
  EstablishmentResolver,
  VehicleResolver,
  ParkingResolver,
];
