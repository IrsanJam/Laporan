import { Test, TestingModule } from '@nestjs/testing';
import { OmsetController } from './omset.controller';

describe('OmsetController', () => {
  let controller: OmsetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OmsetController],
    }).compile();

    controller = module.get<OmsetController>(OmsetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
