import { PartialType } from '@nestjs/swagger';
import { CreateResourceItemDto } from './create-resource-item.dto';

export class UpdateResourceItemDto extends PartialType(CreateResourceItemDto) {}
