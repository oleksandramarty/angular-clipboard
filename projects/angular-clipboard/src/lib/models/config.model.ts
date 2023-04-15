export interface ApiConfig {
  showToast?: boolean | null | undefined,
  duration?: number | null | undefined,
  cssClass?: string | null | undefined,
  text?: string | null | undefined,
}

export const defaultConfig = {
  showToast: true,
  duration: 3000,
  cssClass: '',
  text: 'Text copied to clipboard!'
}
