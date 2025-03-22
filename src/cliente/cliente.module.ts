import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { User } from 'src/usuario/entities/usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), TypeOrmModule.forFeature([User]),
  UsuarioModule,
  HelpersModule,
],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
