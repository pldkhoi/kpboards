You are a senior frontend engineer and product designer specializing in modern SaaS UI/UX.

Please refactor and significantly improve the landing page UI/UX.

First inspect the current landing page carefully (layout, theme system, components, tokens, animations, responsiveness) before making changes.

The current landing page looks visually unfinished and lacks polish. The goal is to transform it into a modern, premium SaaS-quality landing page.

Design direction:
- modern SaaS
- polished
- elegant
- premium
- clean visual hierarchy
- subtle motion and animation
- visually engaging background

Reference quality level:
Linear / Vercel / modern SaaS landing pages.

---

MAIN PROBLEMS OBSERVED

1. Sign-in button looks bad
The sign-in button in the header looks awkward and poorly integrated.

Problems:
- visual hierarchy is wrong
- spacing and alignment are not good
- it looks like a random button rather than a primary action
- styling feels inconsistent with the rest of the UI

Please redesign the header actions.

Possible improvements:
- create clear primary CTA
- better button styling
- better hover/active states
- better alignment inside the navbar
- ensure proper contrast in light/dark modes

---

2. Theme colors are not applied correctly

When I change colors in the theme settings, the landing page colors do not update correctly.

Investigate:
- theme token usage
- CSS variables
- design tokens
- color bindings in components

Fix:
- all colors must come from theme tokens
- ensure theme switching updates landing page colors
- remove hardcoded colors
- unify semantic tokens (primary, secondary, accent, surface, background, text)

---

3. Background looks static and boring

The current landing page background feels empty and static.

Add a modern visual background system such as:

Possible options:
- animated gradient
- animated mesh gradient
- subtle moving particles
- animated light effects
- blurred glowing shapes
- animated grid

Requirements:
- subtle
- smooth
- performant
- not distracting

---

4. Lack of motion and modern UI polish

The landing page currently feels static.

Add modern UI animations such as:

- smooth section entrance animations
- hero text fade/slide
- button hover effects
- card hover animations
- subtle floating effects
- motion for background elements

Use tasteful motion only.

---

5. Hero section composition needs improvement

Improve:

- typography hierarchy
- headline readability
- spacing between elements
- CTA prominence
- layout balance
- responsiveness

Make the hero section feel premium and intentional.

---

6. Feature cards look too basic

The bottom feature cards:

- feel generic
- lack visual hierarchy
- lack depth

Improve them by:

- better card design
- better icon usage
- subtle hover animations
- improved spacing
- better typography

---

7. Navbar visual quality

Improve navbar:

- spacing
- alignment
- hover states
- active states
- glass / blur effect
- responsive layout

Make it feel premium.

---

8. Add visual depth

Improve visual richness with:

- gradients
- blur effects
- shadows
- layered elements
- background effects

But keep it clean and not cluttered.

---

TECHNICAL REQUIREMENTS

- fully respect the existing theme system
- no hardcoded colors
- use theme tokens everywhere
- ensure theme switching works instantly
- maintain good accessibility
- responsive layout
- smooth animations
- clean component structure

---

IMPLEMENTATION PLAN

1. Audit current landing page
2. Fix theme token usage
3. Refactor navbar
4. Refactor hero section
5. Add animated background
6. Improve CTA buttons
7. Improve feature cards
8. Add subtle UI motion
9. Improve responsiveness

---

EXPECTED RESULT

The landing page should feel:

- modern SaaS quality
- visually rich
- animated but elegant
- responsive
- fully theme-aware
- polished and professional

---

DELIVERABLES

After implementation provide:

1. summary of improvements
2. issues found in original landing page
3. theme system fixes
4. animation improvements
5. UI components redesigned