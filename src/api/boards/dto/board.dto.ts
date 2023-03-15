import { IsNotEmpty, IsString } from 'class-validator';
import { ColumnDto } from './column.dto';

export class BoardDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
  public columns: ColumnDto[];
}
