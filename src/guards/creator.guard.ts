import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class CreatorGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers["authorization"];

        if (!authorizationHeader) {
            throw new ForbiddenException("No authorization header provided");
        }

        const token = authorizationHeader.split(" ")[1];
        const payload = this.jwtService.decode(token) as any;

        // Check if the user is a creator
        if (!payload || !payload.is_creator) {
            throw new ForbiddenException("Access denied. Creators only.");
        }

        return true;
    }
}
