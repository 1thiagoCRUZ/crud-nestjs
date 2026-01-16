import {Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, UseGuards} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from "../services/comments.service";
import { CreateCommentDto } from "../dtos/comments/create-comment.dto";

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post(':carId')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.CREATED)
    create(
        @Param('carId', ParseIntPipe) carId: number,
        @Body() createCommentDto: CreateCommentDto,
        @Req() req
    ) {
        return this.commentsService.create(createCommentDto, carId, req.user);
    }


    @Get()
    findAll() {
        return this.commentsService.findAll();
    }

    @Get('car/:carId')
    findByCarId(@Param('carId', ParseIntPipe) carId: number) {
        return this.commentsService.findByCarId(carId);
    }
}