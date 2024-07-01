import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ResourceModule } from '../resource/resource.module';
import { SkillModule } from '../skill/skill.module';
import { ItemModule } from '../item/item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquippedItemModule } from 'src/equipped-item/equipped-item.module';
import { InventoryModule } from 'src/inventory/inventory.module';
import { InventoryItemModule } from 'src/inventory-item/inventory-item.module';
import { PlayerModule } from 'src/player/player.module';
import { PlayerSkillsModule } from 'src/player-skills/player-skills.module';
import { StatsModule } from 'src/stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { ResourceItemsModule } from 'src/resource-items/resource-items.module';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    ResourceModule, 
    SkillModule, 
    ItemModule, 
    EquippedItemModule,
    InventoryModule,
    InventoryItemModule,
    PlayerModule,
    PlayerSkillsModule,
    StatsModule,
    ResourceItemsModule,
    ConfigModule.forRoot({
        isGlobal: true
    }),
    TypeOrmModule.forRoot(databaseConfig())
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
