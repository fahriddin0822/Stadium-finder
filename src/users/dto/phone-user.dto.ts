import { IsString } from "class-validator";


export class PhoneUserDto{
    @IsString()
    phoneNumber: string;
}