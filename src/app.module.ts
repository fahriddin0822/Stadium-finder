import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { MediaModule } from './media/media.module';
import { ComfortModule } from './comfort/comfort.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { StadiumTimesModule } from './stadium_times/stadium_times.module';
import { CartModule } from './cart/cart.module';
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { UserCardsModule } from './user_cards/user_cards.module';
import { UsersModule } from './users/users.module';
import { StadiumsModule } from './stadiums/stadiums.module';
import { CommentsModule } from './comments/comments.module';
import { ComfortStadiumModule } from './comfort_stadium/comfort_stadium.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comfort } from './comfort/models/comfort.model';
import { Region } from './region/models/region.model';
import { District } from './district/models/district.model';
import { Categories } from './categories/models/category.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Comfort, Region, District, Categories],
      autoLoadModels: true,
      sync: { alter: true },
      logging: true,
      synchronize: true,
    }),

    AdminModule,
    DistrictModule,
    RegionModule,
    MediaModule,
    ComfortModule,
    CategoriesModule,
    OrdersModule,
    StadiumTimesModule,
    CartModule,
    UserWalletModule,
    UserCardsModule,
    UsersModule,
    StadiumsModule,
    CommentsModule,
    ComfortStadiumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
