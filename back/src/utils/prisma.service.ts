import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { RedisService } from './redis.service'

@Injectable()
export class DatabaseService {
	private prisma: PrismaClient

	constructor(private readonly redisService: RedisService) {}

	async getPrismaClient() {
		const dbConfig = await this.redisService.get('dbConf')
		if (dbConfig) {
			this.prisma = new PrismaClient({
				datasources: {
					db: {
						url: `mysql://${dbConfig.username}:${dbConfig.pass}@${dbConfig.host}/${dbConfig.database}`,
					},
				},
			})
		} else {
			throw new Error('Database configuration not found in Redis')
		}
		return this.prisma
	}
}
