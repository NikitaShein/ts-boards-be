import { BoardsController } from '../../src/api/boards/boards.controller';
import { BoardsService } from '../../src/api/boards/boards.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('BoardsController', () => {
  let controller: BoardsController;

  const mockBoardsService = {
    getBoardWithContent: jest.fn((id) => {
      return {
        id: Date.now(),
      };
    }),

    createBoard: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),

    createColumn: jest.fn((dto, id) => {
      return {
        id,
        ...dto,
      };
    }),

    createCard: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),

    updateColumn: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),

    updateCard: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),

    removeColumn: jest.fn((id) => {
      return {
        id: Date.now(),
      };
    }),

    removeCard: jest.fn((id) => {
      return {
        id: Date.now(),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [BoardsService],
    })
      .overrideProvider(BoardsService)
      .useValue(mockBoardsService)
      .compile();

    controller = module.get<BoardsController>(BoardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a board with content', () => {
    const id = 1;
    expect(controller.getBoardWithContent(1)).toEqual({
      id: expect.any(Number),
    });

    expect(mockBoardsService.getBoardWithContent).toHaveBeenCalledWith(id);
  });

  it('should create a board', () => {
    const dto = { name: 'Board TEST' };
    expect(controller.createBoard({ name: 'Board TEST' })).toEqual({
      id: expect.any(Number),
      name: dto.name,
    });

    expect(mockBoardsService.createBoard).toHaveBeenCalledWith(dto);
  });

  it('should create a column', () => {
    const dto = { name: 'Column TEST' };
    expect(controller.createColumn({ name: 'Column TEST' }, 1)).toEqual({
      id: expect.any(Number),
      name: dto.name,
    });

    expect(mockBoardsService.createColumn).toHaveBeenCalled();
  });

  it('should create a card', () => {
    const dto = { name: 'Card TEST', text: 'Some text', column_id: 5 };
    expect(
      controller.createCard({
        name: 'Card TEST',
        text: 'Some text',
        column_id: 5,
      }),
    ).toEqual({
      id: expect.any(Number),
      name: dto.name,
      text: dto.text,
      column_id: dto.column_id,
    });

    expect(mockBoardsService.createCard).toHaveBeenCalledWith(dto);
  });

  it('should update a column', () => {
    const dto = { name: 'Column TEST' };

    expect(controller.updateColumn(+'1', dto)).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockBoardsService.updateColumn).toHaveBeenCalled();
  });

  it('should update a card', () => {
    const dto = { name: 'Card TEST', text: 'Some text', column_id: 5 };

    expect(controller.updateCard(+'1', dto)).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockBoardsService.updateCard).toHaveBeenCalled();
  });

  it('should remove column', () => {
    const id = 1;
    expect(controller.removeColumn(1)).toEqual({
      id: expect.any(Number),
    });

    expect(mockBoardsService.removeColumn).toHaveBeenCalledWith(id);
  });

  it('should remove card', () => {
    const id = 1;
    expect(controller.removeCard(1)).toEqual({
      id: expect.any(Number),
    });

    expect(mockBoardsService.removeCard).toHaveBeenCalledWith(id);
  });
});
