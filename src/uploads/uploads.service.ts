import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  getAllFiles(): string[] {
    const fs = require('fs');
    const files = fs.readdirSync('./uploads'); 
    return files;
  }
}
