import { Controller, Get, Param, Query } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@Get('/:take/:skip')
	getAll(
		@Param('take') take: string,
		@Param('skip') skip: string,
		@Query('currency') currency: string,
		@Query('userStatus') userStatus: string,
		@Query('group') group: string,
		@Query('sort') sort: string,
		@Query('order') order: 'asc' | 'desc' = 'asc'
	) {
		return this.usersService.getUsers(
			Number(take),
			Number(skip),
			currency ? currency.split(',') : undefined,
			userStatus ? userStatus.split(',').map(Number) : undefined,
			group ? group.split(',').map(Number) : undefined,
			sort,
			order
		)
	}
}
