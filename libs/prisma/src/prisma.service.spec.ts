import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service = new PrismaService(
    new ConfigService({ DB_SECRET: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3' }),
  );

  it('should encrypt', async () => {
    const result = await service.encryptData('test');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should decrypt', async () => {
    const result = await service.encryptData('test');
    const encrypted = await service.decryptData(result);

    expect(encrypted).toBe('test');
  });
});
