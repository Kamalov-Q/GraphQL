import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AchievementsService } from './achievements.service';
import { Achievement } from './types/achievements.type';
import { CreateAchievementInput } from './inputs/create-achievements.input';

@Resolver()
export class AchievementsResolver {
  constructor(private readonly achievementsService: AchievementsService) { }

  @Mutation(() => Achievement, { name: "createAchievements" })
  createAchievements(@Args('input') input: CreateAchievementInput) {
    return this.achievementsService.createAchievements(input);
  }



}
