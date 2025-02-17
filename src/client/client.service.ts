import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Injectable()
export class ClientService {

  constructor(
      @InjectRepository(Client)
      private _clientRepository: Repository<Client>,
      private readonly _usuarioService: UsuarioService,
      private readonly _helperService: HelpersService
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
    
          // Validar si el correo ya existe en la tabla usuarios
          const clientExist = await this._usuarioService.findByEmail(createClientDto.email);
    
          if (clientExist) {
            return 'Correo ya registrado';
          }
    
          // Generar UUID
          const uuid_usuario = this._helperService.generateUUID();
            createClientDto.uuid = uuid_usuario;
            createClientDto.create_by = 'admin';
    
          const resClient =await this._clientRepository.save(createClientDto);
    
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

  async findAll() {
    const res = await this._clientRepository.find();
    
    if (!res) {
      return 'No hay clientes registrados en el sistema';
    }

    return res;
  }

  async findOne(id_client: number) {
    const res = await this._clientRepository.findOne({ where: { id_client } });
    
    if (!res) {
      return 'Alumno not found';
    }

    return res;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const newDataUser = await this._clientRepository.update(id, updateClientDto);

    if (!newDataUser) {
      return 'User not found';
    }

    return updateClientDto;
  }

  async remove(id: number) {
    return await this._clientRepository.delete(id);
  }

}
