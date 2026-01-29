import { Field, ObjectType } from "@nestjs/graphql";
import { Achievement } from "src/achievements/types/achievements.type";

@ObjectType()
export class Game {

    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    genre: string;

    @Field(() => [Achievement], { nullable: true })
    achievements: Achievement[]

}