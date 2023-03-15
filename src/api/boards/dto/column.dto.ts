import { IsNotEmpty, IsString } from 'class-validator';
import { CardDto } from './card.dto';

export class ColumnDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  public cards: CardDto[];
}
