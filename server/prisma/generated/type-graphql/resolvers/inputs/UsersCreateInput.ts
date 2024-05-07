import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("UsersCreateInput", {})
export class UsersCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  firstName!: string;
}