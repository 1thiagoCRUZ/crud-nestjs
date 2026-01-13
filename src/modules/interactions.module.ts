import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { CommentsService } from "./services/comments.service";
import { CommentRepository } from "./repositories/comment.repository";
import { CarsModule } from "./cars.module";
import { AuthModule } from "./auth/auth.module";
import { Like } from "./entities/like.entity";
import { LikesService } from "./services/likes.service";
import { LikesRepository } from "./repositories/like.repository";
import { CommentsController } from "./controllers/comments.controller";
import { LikesController } from "./controllers/likes.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Like]), CarsModule, AuthModule],
    controllers: [CommentsController, LikesController],
    providers: [CommentsService, CommentRepository, LikesService, LikesRepository],
    exports: [CommentsService, CommentRepository]
})
export class InteractionsModule {}