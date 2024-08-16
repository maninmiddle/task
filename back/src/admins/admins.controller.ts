import { Body, Controller, Post } from '@nestjs/common'
import { AdminsService } from './admins.service'

@Controller('admins')
export class AdminsController {
	constructor(private readonly adminsService: AdminsService) {}

	@Post()
	async auth(
		@Body()
		loginParam: {
			login: string
			pass: string
			ip: string
			userAgent: string
		}
	) {
		return this.adminsService.auth(loginParam)
	}
}
