import { Injectable, UnauthorizedException } from '@nestjs/common'
import { RedisService } from 'src/utils/redis.service'

@Injectable()
export class AdminsService {
	constructor(private readonly redisService: RedisService) {}
	async auth(loginParam: {
		login: string
		pass: string
		ip: string
		userAgent: string
	}) {
		if (loginParam.login !== 'admin1' || loginParam.pass !== '111111') {
			throw new UnauthorizedException('Invalid login or pass')
		}

		const db = {
			host: 'localhost:3306',
			username: 'root',
			pass: '709397959',
			database: 'casino',
		}
		const casino = {
			id: 1,
			name: 'VivaJack',
		}

		await this.redisService.set('dbConf', db)

		return {
			casino,
			db,
			user: {
				id: 1,
				group: 2,
				login: loginParam.login,
			},
		}
	}
}
