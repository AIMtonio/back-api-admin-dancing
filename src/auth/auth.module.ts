import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/usuario/entities/usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    UsuarioModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
