import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './guard.service';

describe('GuardService', () => {
  let service: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard],
    }).compile();

    service = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
