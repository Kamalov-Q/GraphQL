import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './types/game.type';
import { Achievement } from 'src/achievements/types/achievements.type';
import { AchievementsService } from 'src/achievements/achievements.service';
import { AchievementsArgs } from './args/achievements.args';
import { CreateGameInput } from './input/create-game.input';

@Resolver(() => Game)
export class GamesResolver {
  constructor(
    private readonly gamesService: GamesService,
    private readonly achievementsService: AchievementsService
  ) { }


  @Query(() => [Game])
  getGames(
    @Args('offset', { type: () => Int }) offset: number,
    @Args('limit', { type: () => Int }) limit: number
  ) {
    return this.gamesService.getGames(offset, limit);
  }

  @Query(() => Game, { name: 'getSingleGame' })
  async getGameById(@Args('id') id: string) {
    return this.gamesService.getGameById(id);
  }

  @Mutation(() => Game, {name: 'createGame'})
  createGame(@Args('input') input: CreateGameInput) {
    return this.gamesService.createGame(input);
  }

  @ResolveField(() => [Achievement], { name: 'achievements' })
  getAchievements(
    @Parent() game: Game,
    @Args() args: AchievementsArgs
  ) {
    const gameId = game.id ?? (game as any)._id?.toString?.();
    if (!gameId) return [];
    return this.achievementsService.getAchievementsByGameId(gameId, args);
  }
 
}
