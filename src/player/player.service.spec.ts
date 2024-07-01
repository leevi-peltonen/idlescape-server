import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity'

describe('PlayerService', () => {
    let service: PlayerService;
    let repositoryPlayer: Repository<Player>
    let repositoryUser: Repository<User>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlayerService,
                {
                    provide: getRepositoryToken(Player),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository
                }
            ],
        }).compile();

        service = module.get<PlayerService>(PlayerService);
        repositoryPlayer = module.get<Repository<Player>>(getRepositoryToken(Player))
        repositoryUser = module.get<Repository<User>>(getRepositoryToken(User))
    });


});
