import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Injectable()
export class ClienteService {

  constructor(
    @InjectRepository(Cliente)
    private _clienteRepository: Repository<Cliente>,
    private _usuarioService: UsuarioService,
    private _helperService: HelpersService,

  ) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
    
      // Validar si el correo ya existe en la tabla usuarios
      const clientExist = await this._usuarioService.findByEmail(createClienteDto.email);

      if (clientExist) {
        return 'Correo ya registrado';
      }

      // Generar UUID
      const uuid_usuario = this._helperService.generateUUID();
        createClienteDto.uuid = uuid_usuario;
        createClienteDto.create_by = 'admin';

      const resClient = await this._clienteRepository.save(createClienteDto);

      const createUsuario: CreateUsuarioDto = new CreateUsuarioDto();

      createUsuario.uuid = uuid_usuario;
      createUsuario.id_cat_user = 1;
      createUsuario.email = resClient.email;
      createUsuario.username = resClient.email.substring(0, resClient.email.indexOf('@'));
      createUsuario.create_by = 'admin';

      const resUsuario = await this._usuarioService.create(createUsuario);

      if (!resUsuario) {
        return 'Error al crear usuario';
      }

      // Envio de correo electronico de bienvenida y activacion de la cuenta

      return { code: 200, message: 'Alumno creado correctamente', data: resClient };
    }
    catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all cliente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }

  async findByUUID(uuid: string) {
    const res = await this._clienteRepository.findOne({ where: { uuid: uuid, status: 1 } });
  }

}
