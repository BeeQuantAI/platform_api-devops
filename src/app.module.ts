import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ExchangeKeyModule } from './modules/exchangeKey/exchangeKey.module';
import getConfig from './config';
import { AuthModule } from './modules/auth/auth.module';
import { GqlHttpExceptionFilter } from '@/common/filters/error.exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { ExchangeModule } from './modules/exchange/exchange.module';
import { UserExchangeModule } from './modules/user-exchange/user-exchange.module';
import { BinanceDataModule } from './modules/binance-data/binance-data.module';
import { MarketOverviewModule } from './modules/market-overview/market-overview.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getConfig('DB_HOST'),
      port: parseInt(getConfig('DB_PORT'), 10),
      username: getConfig('DB_USERNAME'),
      password: getConfig('DB_PASSWORD'),
      database: getConfig('DB_NAME'),
      entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`],
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
      subscribers: [],
      migrations: [],
    }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      formatError: (error) => {
        const errorMessage = {
          message: error.message,
          path: error.path,
          extensions: error.extensions,
        };
        return errorMessage;
      },
      context: ({ req, res }) => ({ req, res }),
      includeStacktraceInErrorResponses: false,
    }),
    UserModule,
    AuthModule,
    ExchangeKeyModule,
    ExchangeModule,
    UserExchangeModule,
    BinanceDataModule,
    MarketOverviewModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GqlHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
