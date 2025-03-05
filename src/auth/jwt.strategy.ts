import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    const { id, role } = payload;
    
    let user;
    if (role === 'SUPER_ADMIN') {
      user = await this.prisma.superAdmin.findUnique({ where: { id } });
    } else if (role === 'ADMIN') {
      user = await this.prisma.admin.findUnique({ where: { id } });
    } else if (role === 'USER') {
      user = await this.prisma.user.findUnique({ where: { id } });
    }

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
