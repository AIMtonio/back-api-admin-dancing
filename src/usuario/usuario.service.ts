import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(User)
    private _usuarioRepository: Repository<User>,
    private readonly _jwtService: JwtService,
  ) {}

  async generateJwt(usuario: CreateUsuarioDto) {
    const payload = { username: usuario.username, sub: usuario.uuid };
    return this._jwtService.sign(payload);
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    return await this._usuarioRepository.save(createUsuarioDto);
  }

  async findAll() {
    const res = await this._usuarioRepository.find();

    if (!res) {
      return 'No hay usuarios registrados en el sistema';
    }
    return res;
  }

  async findOne(id_user: number) {
    const res = await this._usuarioRepository.findOne({ where: { id_user } }); 
    if(!res){
      return 'Usuario no encontrado';
    }
    return res;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    const user = await this.findOne(id);

    if (!user) {
      return 'Usuario no encontrado';
    }

    const newDataUser = await this._usuarioRepository.update(id, updateUsuarioDto);
    
    return newDataUser;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      return 'Usuario no encontrado';
    }

    await this._usuarioRepository.delete(id);

    return 'Usuario modificado';
  }

  async findByEmail(email: string) {
    return await this._usuarioRepository.findOne({ where: { email: email } });
  }

  async findByEmailAndPassword(email: string, password: string) {
    return await this._usuarioRepository.findOne({ where: { email: email, password: password, status: 1 } });
  }

}
