import { Body, Controller, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";


//Controller will need to call the service.
//It will receive the request from internet and redirect it to the busi ness logic
//It will call the service and return somethiong to the browser.
@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
    //creating endpoints with decorators:
    //Post
    @Post('signup')
    signup(@Body() dto: AuthDto)
    {
       return this.authService.signup(dto)
    }
    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authService.signin(dto)
    }
    
} 