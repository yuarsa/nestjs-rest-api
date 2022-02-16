import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import Config from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database/database.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Config,
      ignoreEnvFile: false,
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      connectionName: 'DatabaseConnectionName',
      inject: [DatabaseService],
      imports: [DatabaseModule],
      useFactory: (databaseService: DatabaseService) =>
        databaseService.createMongooseOptions(),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
