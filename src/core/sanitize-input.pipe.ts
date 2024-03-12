import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import * as DOMPurify from 'dompurify';

const window = new JSDOM('').window;
const domPurify = DOMPurify(window);

@Injectable()
export class SanitizeInputPipe implements PipeTransform {
  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  private sanitizeObj(values) {
    Object.keys(values).forEach((key) => {
      if (this.isObj(values[key])) {
        values[key] = this.sanitizeObj(values[key]);
      } else if (typeof values[key] === 'string') {
        values[key] = domPurify.sanitize(values[key]).trim();
      }
    });

    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (this.isObj(values) && (type === 'body' || type === 'query')) {
      return this.sanitizeObj(values);
    }

    return values;
  }
}
