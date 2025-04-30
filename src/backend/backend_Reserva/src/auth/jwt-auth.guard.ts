import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PUBLIC_KEY } from 'src/decorators/public.decorator'

@Injectable()
export class JwtAuthGuard {
  constructor(
    private reflector: Reflector, // Refletir metadados
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verificar se a rota é pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true // Se a rota é pública, não precisa de autenticação
    }

    const request = context.switchToHttp().getRequest()

    const authHeader = request.headers['authorization']
    if (!authHeader) {
      throw new UnauthorizedException('Token de autorização não fornecido')
    }

    const [bearer, token] = authHeader.split(' ')

    if (!token || bearer !== 'Bearer') {
      throw new UnauthorizedException('Token de autorização mal formatado')
    }

    return true
  }
}
