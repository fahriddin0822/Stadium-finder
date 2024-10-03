import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers["authorization"];

        if (!authorizationHeader) {
            throw new ForbiddenException("No authorization header provided");
        }

        const token = authorizationHeader.split(" ")[1];
        const payload = this.jwtService.decode(token) as any;

        // Check if the user is an admin
        if (!payload || !payload.id) {
            throw new ForbiddenException("Access denied. Admins only.");
        }

        return true;
    }
}
