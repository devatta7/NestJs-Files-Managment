import 'multer';

import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { createParseFilePipe } from '../common/files/file-validation-factory';

@Controller('files-upload')
export class FilesUploadController {
  @Post('/single')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  uploadFile(
    @UploadedFile(createParseFilePipe(5 * 1024 * 1024, /^image\/(jpeg|png)$/))
    file: Express.Multer.File,
  ) {
    return file;
  }

  @Post('/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  uploadMultipleFiles(
    @UploadedFiles(createParseFilePipe(5 * 1024 * 1024, /^image\/(jpeg|png)$/))
    files: Express.Multer.File[],
  ) {
    return files;
  }
}
