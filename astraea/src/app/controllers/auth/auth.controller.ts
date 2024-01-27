import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly supabaseService: SupabaseService) {}
  @Get()
  healthCheck() {
    return { message: 'Auth route is working!'};
  }

  @Post('login')
  async loginWithPassword(@Body() body: { email: string; password: string }) {
    return await this.supabaseService.logInWithPassword(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: { username: string, email: string; password: string }) {
    return await this.supabaseService.signUp(body.username, body.email, body.password);
  }
}
