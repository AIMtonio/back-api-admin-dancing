import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ConfigService } from '@nestjs/config';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private _configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() createUserDto: CreateUsuarioDto) {

    const userExist = await this.usuarioService.findByEmailAndPassword(createUserDto.email, createUserDto.password);
    if (!userExist) {
      return 'Invalid credentials';
    }

    const token = await this.usuarioService.generateJwt(userExist);
    return { access_token: token, token_type: "bearer" };
  }

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    
    //createUsuarioDto.id_cat_usuario = 1;
    return await this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  async findAll() {
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
