import {
  FileTypeValidator,
  FileValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UnprocessableEntityException,
} from '@nestjs/common';

import { FileSignatureValidator } from './validators/file-signature-validator';
import { fileType } from './types/file.types';
import { createFileTypeRegex } from './utils/file.util';
import bytes from 'bytes';
import { FileSizeType } from './types/file.types';

const createFileValidators = (
  maxSize: FileSizeType,
  fileType: fileType[],
): FileValidator[] => {
  const filetypeRegex = createFileTypeRegex(fileType);
  const maxSizeInBytes = bytes(maxSize);

  if (maxSizeInBytes === null) {
    throw new Error(`Invalid file size: ${maxSize}`);
  }

  return [
    new MaxFileSizeValidator({
      maxSize: maxSizeInBytes,
      message: (maxSize) => `File size should not exceed ${maxSize} bytes`,
    }),

    new FileTypeValidator({
      fileType: filetypeRegex,
    }),

    new FileSignatureValidator(),
  ];
};

export const createParseFilePipe = (
  maxSize: FileSizeType,
  fileType: fileType[],
): ParseFilePipe => {
  return new ParseFilePipe({
    validators: createFileValidators(maxSize, fileType),
    errorHttpStatusCode: 422,
    exceptionFactory: (error) =>
      new UnprocessableEntityException(`Custom error: ${error}`),
  });
};
