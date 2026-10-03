import 'multer';

import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('files-upload')
export class FilesUploadController {
  @Post('/single')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200,
            message: (maxSize) =>
              `File size should not exceed ${maxSize} bytes`,
          }),

          new FileTypeValidator({
            fileType: /(jpg|jpeg|png)$/,
          }),
        ],
        errorHttpStatusCode: 422,
        exceptionFactory: (error) => new Error(`Custom error: ${error}`),
      }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }

  @Post('/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return files;
  }
}
