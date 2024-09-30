import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"
dotenv.config();

async function start() {
  try {
    const PORT = process.env.PORT;
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    
  }
  
}
start();
