# Subtle React Bits animation

## What will change
- Add React Bits-style components locally, following the library’s copy-in pattern, with only the animation dependency required by those components.
- Apply a restrained text reveal to the homepage headline and short supporting copy.
- Add gentle scroll-in reveals to the homepage’s main content groups with small staggered delays.
- Add a low-intensity pointer spotlight to work and service cards, while preserving their current links, images, data, spacing, and layout.
- Keep the existing skills carousel behavior unchanged apart from a subtle entrance reveal.

## Accessibility and performance
- Respect reduced-motion preferences and show content immediately when motion is disabled.
- Avoid continuous decorative movement, heavy backgrounds, and effects that interfere with scrolling or touch devices.
- Keep animation code isolated in reusable shared components so other pages remain unchanged.

## Verification
- Confirm the homepage works in light and dark themes at desktop and mobile widths.
- Check that cards remain clickable, the skills carousel still scrolls, and no content flashes or shifts during loading.
