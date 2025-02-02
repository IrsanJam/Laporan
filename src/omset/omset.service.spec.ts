import { Test, TestingModule } from '@nestjs/testing';
import { OmsetService } from './omset.service';

describe('OmsetService', () => {
  let service: OmsetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OmsetService],
    }).compile();

    service = module.get<OmsetService>(OmsetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
