import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module, Logger } from '@nestjs/common';
import { UserModule } from 'src/api/user/user.module';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, Logger],
})
export class AuthModule { }
