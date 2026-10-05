import { FileValidator } from '@nestjs/common/pipes/file/file-validator.interface';
import magicBytes from 'magic-bytes.js';

export class FileSignatureValidator extends FileValidator {
  constructor() {
    super({});
  }

  buildErrorMessage(): string {
    return 'validation failed: file signature does not match the expected format';
  }

  isValid(file: Express.Multer.File): boolean {
    const fileSignatures = magicBytes(file.buffer).map((file) => file.mime);

    if (!fileSignatures.length) {
      return false;
    }

    return fileSignatures.includes(file.mimetype);
  }
}
