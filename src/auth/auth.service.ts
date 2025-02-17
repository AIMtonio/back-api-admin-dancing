import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/usuario/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
      @InjectRepository(User)
      private _usuarioRepository: Repository<User>,
      private readonly _jwtService: JwtService
    ) {}

  async generateJwt(usuario: CreateUsuarioDto) {
    const payload = { username: 'hola', sub: 'mundo' };
    return this._jwtService.sign(payload);
  }

}
