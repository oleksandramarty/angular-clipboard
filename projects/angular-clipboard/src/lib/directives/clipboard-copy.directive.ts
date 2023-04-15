import {Directive, ElementRef, HostListener, Inject, Input, Optional, Renderer2, SecurityContext} from '@angular/core';
import {API_CONFIG_TOKEN} from "../di";
import {ApiConfig, defaultConfig} from "../models/config.model";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Directive({
  selector: '[clipboard]'
})
export class ClipboardCopyDirective {

  @Input() text?: string;
  private messageDiv: HTMLElement | null = null;

  constructor(
    @Optional() @Inject(API_CONFIG_TOKEN) private readonly config: ApiConfig | null,
    private el: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    ) { }


  @HostListener('click') onClick() {
    const textToCopy = this.text || this.el.nativeElement.innerText;
    const elem = document.createElement('textarea');
    elem.value = textToCopy;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);

    if (!this.config || !this.config.showToast) {
      return;
    }

    if (!this.messageDiv) {
      this.messageDiv = this.renderer.createElement('div');
      this.renderer.addClass(this.messageDiv, 'copy-message');
      if (!!this.config.cssClass) {
        this.renderer.addClass(this.messageDiv, this.config.cssClass);
      }
      this.renderer.appendChild(document.body, this.messageDiv);
    }
    if (!!this.messageDiv) {
      const sanitizedText = this.sanitizer.sanitize(SecurityContext.HTML, this.config.text ?? defaultConfig.text);
      this.messageDiv.innerHTML = sanitizedText || '';
      setTimeout(() => {
        this.renderer.removeChild(document.body, this.messageDiv);
        this.messageDiv = null;
      }, this.config.duration ?? defaultConfig.duration);
    }
  }
}
