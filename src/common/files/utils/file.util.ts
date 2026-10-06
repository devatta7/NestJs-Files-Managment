import { fileType } from '../types/file.types';
import { lookup } from 'mime-types';

export const createFileTypeRegex = (fileTypes: fileType[]): RegExp => {
  const mediaType = fileTypes
    .map((fileType) => lookup(fileType))
    .filter((type): type is string => type !== false);

  return new RegExp(`^(${mediaType.join('|')})$`);
};
