// Ariza formasining "Xabar" maydonini boshqa bo'limlardan to'ldirish (kalkulyator, daraja testi)
export const PREFILL_EVENT = 'contact-prefill'

export function prefillContact(message: string) {
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: message }))
}

export const fill = (tpl: string, vars: Record<string, string | number>) =>
  tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))

// Ariza oynasini ochish (pastdan ko'tariladigan panel). Ixtiyoriy: tanlangan kurs/tarif nomi
export const ENROLL_EVENT = 'enroll-open'
export function openEnroll(item?: string) {
  window.dispatchEvent(new CustomEvent(ENROLL_EVENT, { detail: item }))
}
