import {ModuleWithProviders, NgModule} from '@angular/core';
import {ClipboardCopyDirective} from "./directives/clipboard-copy.directive";
import {API_CONFIG_TOKEN} from "./di";
import {ApiConfig, defaultConfig} from "./models/config.model";
import {ClipboardCopyService} from "./clipboard-copy.service";



@NgModule({
  declarations: [
    ClipboardCopyDirective,
  ],
  imports: [
  ],
  exports: [
    ClipboardCopyDirective,
  ]
})

export class AngularClipboardModule {
  static forRoot(config?: ApiConfig | null): ModuleWithProviders<AngularClipboardModule> {
    return {
      ngModule: AngularClipboardModule,
      providers: [
        { provide: API_CONFIG_TOKEN, useValue: config ?? defaultConfig },
        ClipboardCopyDirective,
        ClipboardCopyService,
      ],
    }
  }
}
