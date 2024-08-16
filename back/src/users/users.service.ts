import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/utils/prisma.service'
import '../utils/utils'

@Injectable()
export class UsersService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getUsers(
		take: number,
		skip: number,
		currency?: string[],
		userStatus?: number[],
		group?: number[],
		sort?: string,
		order: 'asc' | 'desc' = 'asc'
	) {
		const prismaClient = await this.databaseService.getPrismaClient()
		return prismaClient.users.findMany({
			take: take,
			skip: skip,
			where: {
				...(currency && {
					currency: {
						in: currency,
					},
				}),
				...(userStatus && {
					status: {
						in: userStatus,
					},
				}),
				...(group && {
					group: {
						in: group,
					},
				}),
			},
			orderBy: sort ? { [sort]: order } : { id: 'desc' },
		})
	}
}
