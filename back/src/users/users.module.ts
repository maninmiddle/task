import { Module } from '@nestjs/common'
import { DatabaseService } from 'src/utils/prisma.service'
import { RedisService } from 'src/utils/redis.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	controllers: [UsersController],
	providers: [UsersService, DatabaseService, RedisService],
})
export class UsersModule {}
