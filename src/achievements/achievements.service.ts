import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AchievementsDocument, AchievementsEntity } from './schemas/achievements.schema';
import mongoose, { Model } from 'mongoose';
import { AchievementsArgs } from 'src/games/args/achievements.args';
import { CreateAchievementInput } from './inputs/create-achievements.input';
import { GameDocument, GameEntity } from 'src/games/schema/game.schema';

@Injectable()
export class AchievementsService {

    constructor(
        @InjectModel(AchievementsEntity.name) private readonly achievementsModel: Model<AchievementsDocument>,
        @InjectModel(GameEntity.name) private readonly gameModel: Model<GameDocument>
 
    ) { }
 
    async getAchievementsByGameId(gameId: string, args: AchievementsArgs) {

        const match = { gameId: new mongoose.Types.ObjectId(gameId) };

        if (args.difficulty) {
            match['difficulty'] = args.difficulty;
        }

        return this.achievementsModel.find(match).skip(args?.offset).limit(args?.limit);
    } 

    async createAchievements(achievement: CreateAchievementInput) {

        const { gameId, ...achievementData } = achievement;

        const gameExists = await this.gameModel.findById(gameId);

        if (!gameExists) {
            throw new NotFoundException('Game not found!');
        } 

        const newAchievement = new this.achievementsModel({
            ...achievementData,
            gameId: new mongoose.Types.ObjectId(gameId),
        });

        return newAchievement.save();
    }
 
}
