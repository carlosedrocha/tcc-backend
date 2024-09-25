import { Test, TestingModule } from '@nestjs/testing';
import { WaiterBellService } from './waiter-bell.service';

describe('WaiterBellService', () => {
  let service: WaiterBellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaiterBellService],
    }).compile();

    service = module.get<WaiterBellService>(WaiterBellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
