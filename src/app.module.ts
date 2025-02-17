import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolModule } from './rol/rol.module';
import { AlumnoModule } from './alumno/alumno.module';
import { MaestroModule } from './maestro/maestro.module';
import { ClaseModule } from './clase/clase.module';
import { PagoModule } from './pago/pago.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
// import { Auth } from './auth/entities/auth.entity';
import { HelpersModule } from './helpers/helpers.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [RolModule, AlumnoModule, MaestroModule, ClaseModule, PagoModule, UsuarioModule, AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'admin_dancing',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    HelpersModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
