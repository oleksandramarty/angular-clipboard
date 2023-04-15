import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[copycat]'
})
export class ClipboardCopyDerective {

  @Input() text: string;

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
    const textToCopy = this.text || this.el.nativeElement.innerText;
    const elem = document.createElement('textarea');
    elem.value = textToCopy;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  }

}
