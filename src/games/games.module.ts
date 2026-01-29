import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { GameEntity, GameSchema } from './schema/game.schema';
import { AchievementsModule } from 'src/achievements/achievements.module';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: GameEntity.name, schema: GameSchema
    }
  ]),
    AchievementsModule
  ],
  providers: [GamesResolver, GamesService],
})
export class GamesModule { }
