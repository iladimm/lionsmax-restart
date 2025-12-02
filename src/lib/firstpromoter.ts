declare global {
  interface Window {
    FirstPromoter?: any;
  }
}
const firstPromoterKey = import.meta.env.VITE_FIRSTPROMOTER_KEY;
export const initFirstPromoter = () => {
  if (typeof window !== 'undefined' && window.FirstPromoter) {
    window.FirstPromoter.init({ id: firstPromoterKey });
  }
};
