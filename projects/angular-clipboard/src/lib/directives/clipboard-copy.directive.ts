import {Directive, ElementRef, HostListener, Inject, Input, Optional, Renderer2, SecurityContext} from '@angular/core';
import {API_CONFIG_TOKEN} from "../di";
import {ApiConfig, defaultConfig} from "../models/config.model";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ClipboardCopyService} from "../clipboard-copy.service";

@Directive({
  selector: '[clipboard]'
})
export class ClipboardCopyDirective {

  @Input() text?: string;
  private messageDiv: HTMLElement | null = null;

  constructor(
    @Optional() @Inject(API_CONFIG_TOKEN) private readonly config: ApiConfig | null,
    private readonly clipboardService: ClipboardCopyService,
    private el: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    ) {
    // set style cursor to pointer
    if (!!this.config?.pointer) {
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    }
  }


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

    this.clipboardService.clipboardCopyStatusSource.next(true);

    if (!this.messageDiv) {
      this.messageDiv = this.renderer.createElement('div');
      if (!!this.config?.useDefaultStyle) {
        this.renderer.addClass(this.messageDiv, defaultConfig.defaultCssClass);
        this.renderer.setStyle(this.messageDiv, 'background-color', '#333');
        this.renderer.setStyle(this.messageDiv, 'color', '#fff');
        this.renderer.setStyle(this.messageDiv, 'font-size', '16px');
        this.renderer.setStyle(this.messageDiv, 'padding', '10px');
        this.renderer.setStyle(this.messageDiv, 'border-radius', '5px');
        this.renderer.setStyle(this.messageDiv, 'position', 'fixed');
        this.renderer.setStyle(this.messageDiv, 'bottom', '10px');
        this.renderer.setStyle(this.messageDiv, 'left', '50%');
        this.renderer.setStyle(this.messageDiv, 'transform', 'translate(-50%, -10px)');
      }
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
