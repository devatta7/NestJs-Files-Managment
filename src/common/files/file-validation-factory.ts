import {
  FileTypeValidator,
  FileValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UnprocessableEntityException,
} from '@nestjs/common';

import { FileSignatureValidator } from './validators/file-signature-validator';

const createFileValidators = (
  maxSize: number,
  fileType: RegExp,
): FileValidator[] => {
  return [
    new MaxFileSizeValidator({
      maxSize,
      message: (maxSize) => `File size should not exceed ${maxSize} bytes`,
    }),

    new FileTypeValidator({
      fileType,
    }),

    new FileSignatureValidator(),
  ];
};

export const createParseFilePipe = (
  maxSize: number,
  fileType: RegExp,
): ParseFilePipe => {
  return new ParseFilePipe({
    validators: createFileValidators(maxSize, fileType),

    errorHttpStatusCode: 422,

    exceptionFactory: (error) =>
      new UnprocessableEntityException(`Custom error: ${error}`),
  });
};
