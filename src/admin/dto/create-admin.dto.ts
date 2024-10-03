export class CreateAdminDto {
    login: string;
    telegram_link: string;
    admin_photo: string;
    password: string;
    is_active: boolean;
    is_creater: boolean;
    hashed_refresh_token: string;
    activation_link: string;
    email: string;
}
