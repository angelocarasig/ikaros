import { Module } from '@nestjs/common';

import { AppController } from './controllers/app/app.controller';
import { AppService } from './services/app/app.service';
import { SupabaseService } from './services/supabase/supabase.service';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
