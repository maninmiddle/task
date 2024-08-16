import { Injectable } from '@nestjs/common'
import { RedisClientType, createClient } from 'redis'

@Injectable()
export class RedisService {
	private redisClient: RedisClientType

	constructor() {
		this.redisClient = createClient({
			url: 'redis://localhost:6379',
		})
		this.redisClient.on('error', err => console.error('Redis error:', err))
	}

	async onModuleInit() {
		await this.redisClient.connect()
	}

	async onModuleDestroy() {
		if (this.redisClient.isOpen) {
			await this.redisClient.quit()
		}
	}

	async set(key: string, value: any) {
		await this.redisClient.set(key, JSON.stringify(value))
	}

	async get(key: string): Promise<any> {
		const data = await this.redisClient.get(key)
		return data ? JSON.parse(data) : null
	}
}
