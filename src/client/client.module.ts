import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
//import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Client]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1h' },
  }),
  UsuarioModule,
  HelpersModule
],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
