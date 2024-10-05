

export class PhoneUserDto {
    phoneNumber: string;
    password: string;

    constructor(phoneNumber: string, password: string) {
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}