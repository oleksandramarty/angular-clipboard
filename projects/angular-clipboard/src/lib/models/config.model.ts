export interface ApiConfig {
  pointer?: boolean | null | undefined,
  showToast?: boolean | null | undefined,
  duration?: number | null | undefined,
  useDefaultStyle?: boolean | null | undefined,
  cssClass?: string | null | undefined,
  text?: string | null | undefined,
}

export const defaultConfig = {
  pointer: true,
  showToast: true,
  duration: 3000,
  useDefaultStyle: true,
  cssClass: '',
  text: 'Text copied to clipboard!',
  defaultCssClass: 'copy-message-toast',
}
