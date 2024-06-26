import { ClipboardCopyDirective } from './clipboard-copy.directive';
import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {API_CONFIG_TOKEN} from "../di";
import {ApiConfig} from "../models/config.model";
import {ClipboardCopyService} from "../clipboard-copy.service";

@Component({
  template: `
    <p clipboard>Text to be copied</p>
  `,
})
class TestComponent {}

describe('ClipboardCopyDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let pElement: DebugElement;
  let directiveEl: DebugElement;

  const defaultCssClass = 'copy-message-toast';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClipboardCopyDirective, TestComponent ],
      providers:[
        ClipboardCopyService,
        ClipboardCopyDirective,
        { provide: API_CONFIG_TOKEN, useValue: {
            pointer: true,
            showToast: true,
            text: 'Text copied!',
            duration: 3000,
            useDefaultStyle: true,
            cssClass: 'toast',
          } } // Provide the mock config object
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pElement = fixture.debugElement.query(By.css('p'));
    directiveEl = fixture.debugElement.query(By.directive(ClipboardCopyDirective));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy text to clipboard on click', () => {
    spyOn(document, 'execCommand');
    directiveEl.triggerEventHandler('click', null);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(document.execCommand).toHaveBeenCalledTimes(1);
  });

  it('should display toast message on copy', () => {
    spyOn(document, 'execCommand');
    directiveEl.triggerEventHandler('click', null);
    const messageDiv = document.querySelector(`.${defaultCssClass}`);
    expect(messageDiv).toBeTruthy();
    expect(messageDiv!.textContent).toBe('Text copied!');
    setTimeout(() => {
      expect(document.querySelector(`.${defaultCssClass}`)).toBeFalsy();
    }, 3000);
  });

  it('should copy text to clipboard on click', () => {
    spyOn(document, 'execCommand');
    pElement.triggerEventHandler('click', null);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(document.execCommand).toHaveBeenCalledTimes(1);
  });

  it('should display toast message on copy', () => {
    spyOn(document, 'execCommand');
    pElement.triggerEventHandler('click', null);
    const messageDiv = document.querySelector(`.${defaultCssClass}`);
    expect(messageDiv).toBeTruthy();
    expect(messageDiv!.textContent).toBe('Text copied!');
    setTimeout(() => {
      expect(document.querySelector(`.${defaultCssClass}`)).toBeFalsy();
    }, 3000);
  });

  it('should add custom CSS class to toast message', () => {
    spyOn(document, 'execCommand');
    pElement.triggerEventHandler('click', null);
    const messageDiv = document.querySelector(`.${defaultCssClass}`);
    expect(messageDiv).toBeTruthy();
    expect(messageDiv!.classList).toContain(defaultCssClass);
    expect(messageDiv!.classList).toContain('toast');
  });
});

