import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import { CreateUserDto } from 'src/api/user/dto/create.user.dto';
import * as jwt from 'jsonwebtoken';
import { RegistrationStatus } from './interface/registrationStatus.interface';
import { User } from 'src/api/user/user.entity';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserRO } from 'src/api/user/userRO';
import { sign } from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {

  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async register(user: CreateUserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };

    try {
      await this.userService.create(user);
    } catch (err) {
      status = { success: false, message: err };
    }

    return status;

  }

  createToken(user: User) {
    const expiresIn = 3600;

    const accesstoken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      'Codebrains',
      { expiresIn },
    );
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
    try {

      let user: User = await this.userService.findOneByThirdPartyId(thirdPartyId, provider);

      if (!user) {
        user = await this.userService.create(user);
      }

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
      return jwt;
    } catch (error) {
      throw new InternalServerErrorException('validateOAuthLogin', error.message);
    }
  }

  async validateUserToken(payload: JwtPayload): Promise<User> {
    return await this.userService.findById(payload.id);
  }

  async validateUser(email: string, password: string): Promise<UserRO> {
    const user = await this.userService.findByEmail(email);
    if (user && user.comparePassword(password)) {
      this.logger.log(`password check success`);
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
 }
