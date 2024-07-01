import { Module } from '@nestjs/common';
import { EquippedItemService } from './equipped-item.service';
import { EquippedItemController } from './equipped-item.controller';

@Module({
  controllers: [EquippedItemController],
  providers: [EquippedItemService],
})
export class EquippedItemModule {}
