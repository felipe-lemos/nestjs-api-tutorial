import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

//For any class to use injectable dependencies, we should use the @Injectable decorator

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(config: ConfigService){
        super({
            datasources:{
                db:{
                    url: config.get(`DATABASE_URL`)
                }
            }
        })
    }
}
