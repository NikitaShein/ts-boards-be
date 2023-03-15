import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from '../../src/api/boards/boards.service';

describe('BoardsService', () => {
  let service: BoardsService;

  const mockBoardsService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService],
    })
      .overrideProvider(BoardsService)
      .useValue(mockBoardsService)
      .compile();

    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
