export class CreateClientDto {
    id_client: number;
    name: string;
    surname?: string;
    lastname?: string;
    birthdate: Date;
    phone: string;
    email: string;
    uuid: string;
    status: number;
    create_by?: string;
    create_at?: Date;
    update_by?: string;
    update_at?: Date;
  }