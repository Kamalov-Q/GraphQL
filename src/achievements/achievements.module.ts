import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsResolver } from './achievements.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AchievementsEntity, AchievementsSchema } from './schemas/achievements.schema';
import { GameEntity, GameSchema } from 'src/games/schema/game.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: AchievementsEntity.name,
      schema: AchievementsSchema,
      collection: 'achievements'
    },
    {
      name: GameEntity.name,
      schema: GameSchema,
      collection: 'games'
    }
  ])],
  providers: [AchievementsResolver, AchievementsService],
  exports: [AchievementsService]
})
export class AchievementsModule { }
