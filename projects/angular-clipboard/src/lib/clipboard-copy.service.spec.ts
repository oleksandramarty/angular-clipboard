import { ClipboardCopyService } from './clipboard-copy.service';
import { BehaviorSubject } from 'rxjs';

describe('ClipboardCopyService', () => {
  let clipboardCopyService: ClipboardCopyService;
  let clipboardCopyStatusSource: BehaviorSubject<boolean | null>;

  beforeEach(() => {
    clipboardCopyService = new ClipboardCopyService();
    clipboardCopyStatusSource = clipboardCopyService.clipboardCopyStatusSource;
  });

  it('should initially have a null clipboardCopyStatus', () => {
    expect(clipboardCopyStatusSource.getValue()).toBeNull();
  });

  it('should update clipboardCopyStatus with a boolean value when called', () => {
    clipboardCopyService.clipboardCopyStatusSource.next(true);
    expect(clipboardCopyStatusSource.getValue()).toBe(true);
  });
});


