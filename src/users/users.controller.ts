import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/CreateUser.dto';
import { CapitalizePipe } from './pipe/capitalize/capitalize.pipe';
import { UsersService } from './users.service';
import { Authguard } from './guard/authguard/authguard.guard';

//Usage of controller and parent endpoint
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('service')
  getallUser() {
    return this.userService.fetchUsers();
  }

  @Get()
  getUser() {
    return 'User returned';
  }
  //Nested endpoint usage
  @Get('details')
  getDetails() {
    return 'User details Returned';
  }

  //Post method Usage
  @Post('form')
  createUser(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    response.send('User created successfully');
  }

  //Body Decorator Usage
  @Post('data')
  createData(@Body() requestdata: any, @Res() response: Response) {
    console.log(requestdata);

    const { name, email, age } = requestdata;
    response.send({
      message: 'Data Fetched Successfully',
      name,
      email,
      age,
    });
  }

  //Implementing the Dto

  @Post('create-user')
  createuserschema(@Body() user: CreateUserDto) {
    console.log(user);
  }

  //Route Params
  @Get('route/:id')
  userid(@Param('id') id: number) {
    console.log(id);
    return { id };
  }

  //Nested Route Params
  @Get('route/:id/:name')
  userNest(@Param('id') id: number, @Param('name') name: string) {
    console.log(id, name);
    return { id, name };
  }

  //Query Params
  @Get('/query')
  userSearch(@Query('name') name: string) {
    console.log(name);
    return name;
  }

  //pipe transformation

  @Get('transform/:id')
  getTransform(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return { id };
  }

  //Pipe transform of query params
  @Get('transform')
  queryTransform(@Query('query', ParseBoolPipe) query: boolean) {
    console.log(typeof query);
    return { query };
  }

  //Validation
  @Post('user-validation')
  @UsePipes(new ValidationPipe())
  userValidation(@Body() user: CreateUserDto) {
    console.log(user);
  }

  //Custom pipe Implementation
  @Get('capitalize')
  @UsePipes(CapitalizePipe)
  getCapitalize(@Query('text') text: string): string {
    console.log(text);
    return text;
  }

  //Custom pipes validation
  @Post('usercreation')
  @UsePipes(new ValidationPipe())
  userCreation(@Body() usercreation: CreateUserDto) {
    return this.userService.createUser(usercreation);
  }

  @Get('middle')
  getMiddleware() {
    return 'middleware works';
  }

  @Get('guard')
  @UseGuards(Authguard)
  getGuard() {
    return 'Guard works';
  }
}
