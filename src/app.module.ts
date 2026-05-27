import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, DatabaseModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
