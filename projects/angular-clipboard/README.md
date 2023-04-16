## Setting up in `module's imports`
```ts
AngularClipboardModule.forRoot({
  text: 'Copied!', // Custom toast text or html
  cssClass: 'test', // Custom style
  duration: 3000, // Toast duration
  showToast: true, // Show toast
  useDefaultStyle: true, // Default toast style
  pointer: true, // Set cursor pointer for clipboard html el
}),
```

```ts
NOTE: Config optional
```

| Key               | Type       | Optional  | Default value               |
|-------------------|------------|-----------|-----------------------------|
| `pointer`         | `boolean`  | `yes`     | `true`                      |
| `showToast`       | `boolean`  | `yes`     | `true`                      |
| `duration`        | `number`   | `yes`     | `3000`                      |
| `useDefaultStyle` | `boolean`  | `yes`     | `true`                      |
| `cssClass`        | `string`   | `yes`     | ` `                         |
| `text`            | `string`   | `yes`     | `Text copied to clipboard!` |

## Usage `ClipboardCopyService` in `ts`
```ts
import {ClipboardCopyService} from "angular-clipboard";

...

export class MovieListComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

...

  constructor(private readonly clipboardCopyService: ClipboardCopyService) {
    this.clipboardCopyService.clipboardCopyStatus$
      .pipe((takeUntil(this.ngUnsubscribe)))
      .subscribe(data => {
        if (!!data) {
          // Text copied!
        }
      })
  }
```

## Usage `ClipboardCopyDirective` in `html`
```html
<p clipboard>My text</p> <!-- Clipboard = My text -->
<p>My text</p> <i class="your icon" clipboard [text]="'My text'"></i> <!-- Clipboard = My text -->
<p clipboard [text]="'My custom text 1'">My text</p> <!-- Clipboard = My custom text 1 -->
<p clipboard clipboard text="My custom text 2">My text</p> <!-- Clipboard = My custom text 2 -->
```

## Tips

For copy notification you can use:
- `showToast` = true
- `ClipboardCopyService`
- `(click)`
