import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'ormconfig';

const typeOrmConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: () => ({ ...config }),
  inject: [ConfigService],
});

export default typeOrmConfig;
