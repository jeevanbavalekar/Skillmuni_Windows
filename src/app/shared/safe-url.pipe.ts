import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): SafeResourceUrl {
    if (value.includes('youtu.be') || value.includes('youtube.com')) {
      // Convert YouTube short links (youtu.be) to embeddable format
      const embedUrl = value
        .replace('watch?v=', 'embed/')  // Convert standard YouTube link
        .replace('youtu.be/', 'www.youtube.com/embed/'); // Convert shortened YouTube link

      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    // Sanitize regular URLs (images)
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
