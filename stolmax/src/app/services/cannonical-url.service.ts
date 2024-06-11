import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Renderer2 } from "@angular/core";
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class CannonicalUrlService {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        private meta: Meta,
        private titleService: Title
    ) { }

    public UpdateCannonicalUrl(url: string): void {
        const canonicalLink = this.document.querySelector('link[rel="canonical"]');

        if (canonicalLink) {
            this.renderer.setAttribute(canonicalLink, 'href', url);
        }
    }

    public UpdateTitleAndDesc(title: string, desc: string): void {
        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: desc });
    }

    public UpdateJsonLd(config: any): void {
        this.meta.addTag({ name: 'json+ld', content: JSON.stringify(config) });

    }
}