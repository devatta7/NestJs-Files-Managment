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
import { MaxFileCount } from '../common/files/constants/file-count.constants';
import bytes from 'bytes';

@Controller('files-upload')
export class FilesUploadController {
  @Post('/single')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: bytes('5MB')!,
      },
    }),
  )
  uploadFile(
    @UploadedFile(createParseFilePipe('5MB', ['jpeg', 'png']))
    file: Express.Multer.File,
  ) {
    return file;
  }

  @Post('/multiple')
  @UseInterceptors(
    FilesInterceptor('files', MaxFileCount.multiple, {
      limits: {
        fileSize: bytes('5MB')!,
      },
    }),
  )
  uploadMultipleFiles(
    @UploadedFiles(createParseFilePipe('5MB', ['jpeg', 'png']))
    files: Express.Multer.File[],
  ) {
    return files;
  }
}
