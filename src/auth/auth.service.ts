import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class  AuthService{
    constructor(private prisma: PrismaService ) {}
    async signup(dto: AuthDto){
// Generate the passwordHash
  const hash = await argon.hash(dto.password)

// save thr new user on the db
try{
  const user = await this.prisma.user.create({
    data: {
        email: dto.email,
        hash,
    }
  })

  delete user.hash;
//return the saved user

return user
} catch(error){
    if(error instanceof PrismaClientKnownRequestError){
        if(error.code === 'P2002'){
            throw new ForbiddenException('Credentials already created')
        }
    }
}
    }

    async signin(dto: AuthDto){

        const user = await this.prisma.user.findUnique({
            where:{
                email: dto.email
            }
        })

        if (!user){
            throw new ForbiddenException(
                'Credentials Incorrect'
            )
        }
       

        //compare password

        const pwMatches = await argon.verify(
            user.hash,
            dto.password
        )

        if(!pwMatches){
            throw new ForbiddenException(
                'Credentials Incorrect'
            )
        }
        //if password does not matrch, exception

        delete user.hash;
        return user

        //send back user.
        return {msg : `I Have signed In!`}

    }
}