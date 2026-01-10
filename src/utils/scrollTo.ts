/**
 * Smoothly scrolls to a target element with eased animation.
 * @param elementId - The ID of the target element to scroll to
 * @param offset - Optional offset from the top (default: 80px for navbar)
 * @param duration - Animation duration in milliseconds (default: 500ms)
 */
export function smoothScrollTo(
  elementId: string,
  offset: number = -16,
  duration: number = 500
): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const start = window.scrollY;
  const rect = element.getBoundingClientRect();
  const end = start + rect.top - offset;
  const startTime = performance.now();

  function animateScroll(currentTime: number): void {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start + (end - start) * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}
