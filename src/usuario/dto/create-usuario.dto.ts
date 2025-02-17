export class CreateUsuarioDto {
  id_user: number;
  uuid?: string;
  username: string;
  password?: string;
  email: string;
  id_cat_user?: number;
  status: number;
  create_by?: string;
  create_at?: Date;
  update_by?: string;
  update_at?: Date;
}