import { Module } from '@nestjs/common'
import { DatabaseService } from 'src/utils/prisma.service'
import { RedisService } from 'src/utils/redis.service'
import { AdminsController } from './admins.controller'
import { AdminsService } from './admins.service'

@Module({
	controllers: [AdminsController],
	providers: [AdminsService, DatabaseService, RedisService],
})
export class AdminsModule {}
