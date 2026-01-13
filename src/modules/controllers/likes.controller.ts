import { Controller, Post, Param, ParseIntPipe, UseGuards, Req, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LikesService } from '../services/likes.service';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) { }

    @Post(':carId')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    async toggle(@Param('carId', ParseIntPipe) carId: number, @Req() req) {
        return this.likesService.toggleLike(carId, req.user);
    }

    @Get('my-likes')
    @UseGuards(AuthGuard('jwt'))
    async findMyLikes(@Req() req) {
        return this.likesService.findUserLikes(req.user.id);
    }
}