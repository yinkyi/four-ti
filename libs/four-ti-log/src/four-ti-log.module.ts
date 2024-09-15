import { Module } from '@nestjs/common';
import { FourTiLogService } from './four-ti-log.service';

@Module({
  providers: [FourTiLogService],
  exports: [FourTiLogService],
})
export class FourTiLogModule {}
