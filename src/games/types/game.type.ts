import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Game {

    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    genre: string;

}