import { PartialType } from '@nestjs/mapped-types';
import { CreateEquippedItemDto } from './create-equipped-item.dto';

export class UpdateEquippedItemDto extends PartialType(CreateEquippedItemDto) {}
