import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';

@Module({
	imports: [UsersModule, AdminsModule],
})
export class AppModule {}
