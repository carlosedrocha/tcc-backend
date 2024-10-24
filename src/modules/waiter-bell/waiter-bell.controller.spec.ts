import { Test, TestingModule } from '@nestjs/testing';
import { WaiterBellController } from './waiter-bell.controller';

describe('WaiterBellController', () => {
  let controller: WaiterBellController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaiterBellController],
    }).compile();

    controller = module.get<WaiterBellController>(WaiterBellController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
