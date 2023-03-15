import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Permission from './entities/permissions.entity';

@Injectable()
export class PermissionsService {
  @InjectRepository(Permission)
  private readonly permissionRepository: Repository<Permissions>;

  public async checkPermisson(
    board_id: number,
    user_id: number,
  ): Promise<Permissions[]> {
    return await this.permissionRepository.find({
      where: { board_id: board_id, user_id: user_id },
    });
  }
}
