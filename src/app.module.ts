import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { ChannelModule } from './channel/channel.module';
import { User } from './user/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'yourpassword',
    database: 'db_chat',
    entities: [User],
    synchronize: true
  }),AuthModule, UserModule, MessageModule, ChannelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
