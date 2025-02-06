import { Test, TestingModule } from '@nestjs/testing';
import { MarketingService } from './marketing.service';
import { Marketing } from './marketing.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockMarketing = {name:'irsan'}
const mockMarketingRepository = {
  find: jest.fn().mockResolvedValue([mockMarketing]),
  findOneBy: jest.fn().mockResolvedValue(mockMarketing),
  create: jest.fn().mockReturnValue(mockMarketing),
  save: jest.fn().mockResolvedValue(mockMarketing),
  remove: jest.fn().mockResolvedValue(mockMarketing),
}

describe('MarketingService', () => {
  let service: MarketingService;
  let repository: Repository<Marketing>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketingService, {
        provide: getRepositoryToken(Marketing),
        useValue: mockMarketingRepository
      }],
    }).compile();

    service = module.get<MarketingService>(MarketingService);
    repository = module.get<Repository<Marketing>>(getRepositoryToken(Marketing));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of marketing', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockMarketing]);
      expect(repository.find).toHaveBeenCalled();
    })

  })
  
  describe('findOne', () => {
    it('should return a marketing', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockMarketing);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    })
  })

  describe('create', () => {
    it('should create a marketing', async () => {
      const result = await service.create(mockMarketing);
      expect(result).toEqual(mockMarketing);
      expect(repository.create).toHaveBeenCalledWith(mockMarketing);
      expect(repository.save).toHaveBeenCalledWith(mockMarketing);
    })
  })

  describe('update', () => {
    it('should update a marketing', async () => {
      const result = await service.update(1, {name:'irsani'});
      expect(result).toEqual(mockMarketing);
      expect(repository.save).toHaveBeenCalled();
    })
  })

  describe('delete', () => {
    it('should delete a marketing', async () => {
      const result = await service.remove(1);
      expect(result).toEqual({
        message: 'Deleted Successfully',
        status: 200
      });
      expect(repository.remove).toHaveBeenCalledWith(mockMarketing);
    })
  })

});
