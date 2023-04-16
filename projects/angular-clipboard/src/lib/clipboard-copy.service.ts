import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ClipboardCopyService {
  public clipboardCopyStatusSource = new BehaviorSubject<boolean | null>(null)
  clipboardCopyStatus$ = this.clipboardCopyStatusSource.asObservable()

  constructor() {
  }
}
