import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PermissionsDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @IsNumber()
  @IsNotEmpty()
  public board_id: number;
}
