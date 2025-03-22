import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { HelpersModule } from './helpers/helpers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsuarioModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: 3306,
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
