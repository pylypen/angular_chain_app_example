import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(v:string):SafeHtml {
    v = v.replace(/font-family:/g, '');
    v = v.replace(/font-size:/g, "");
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}