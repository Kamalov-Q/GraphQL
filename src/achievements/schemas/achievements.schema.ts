import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Difficulty } from "../types/achievements.type";

export type AchievementsDocument = AchievementsEntity & Document;

@Schema({ timestamps: true })
export class AchievementsEntity {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({
        required: true,
        enum: Difficulty
    })
    difficulty: Difficulty

    @Prop({ required: true, type: Number })
    points: number;

    @Prop({ type: Types.ObjectId })
    gameId: Types.ObjectId

}

export const AchievementsSchema = SchemaFactory.createForClass(AchievementsEntity);