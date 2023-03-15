import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardDto {
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public text: string;

  @IsNumber()
  public position: number;

  @IsNumber()
  @IsNotEmpty()
  public column_id: number;
}
