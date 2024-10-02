import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

export class UserGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException("UnAuthorized user");
        }

        const bearer = authHeader.split(" ")[0];
        const token = authHeader.split(" ")[1];
        console.log(token);
        

        if (bearer != "Bearer" || !token) {
            throw new UnauthorizedException("UnAuthorized user");
        }

        // return await this.verify(token, req);

        async function verify(token: string, jwtService: JwtService) {
            let payload: any;
            try {
                payload = await jwtService.verify(token, {
                    secret: process.env.ACCESS_TOKEN_KEY,
                });
            } catch (error) {
                throw new BadRequestException(error);
            }
            if (!payload) {
                throw new UnauthorizedException("UnAuthorized user");
            }
            if (!payload.is_active) {
                throw new ForbiddenException("Ruxsat etilmagan");
            }

            req.user = payload;
            return true;
        }
        return verify(token, this.jwtService);
    }
}
