import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UnprocessableEntityException,
} from '@nestjs/common';

import { FileSignatureValidator } from './validators/file-signature-validator';

export const createParseFilePipe = (
  maxSize: number,
  fileType: RegExp,
): ParseFilePipe => {
  return new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize,
        message: (maxSize) => `File size should not exceed ${maxSize} bytes`,
      }),

      new FileTypeValidator({
        fileType,
      }),

      new FileSignatureValidator(),
    ],

    errorHttpStatusCode: 422,

    exceptionFactory: (error) =>
      new UnprocessableEntityException(`Custom error: ${error}`),
  });
};
