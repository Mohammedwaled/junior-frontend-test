/**
 * Typography — font sizes, weights, and family from the web application.
 *
 * Web app uses: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI"
 * React Native: System font stack + Inter loaded via expo-font (or system fallback for now).
 *
 * Note: React Native fontWeight must be a string.
 */

const typography = {

  // ─── Font Family ─────────────────────────────────────────────────────────────
  // Web: font-family: Inter, ui-sans-serif, system-ui, -apple-system, ...
  // Decision: expo-font is NOT installed (not in node_modules).
  // Using the platform system font — SF Pro on iOS, Roboto on Android.
  // Both are clean modern sans-serifs visually close to Inter.
  // To add Inter later: install expo-font, load useFonts({ Inter }), set fontFamily: 'Inter'.
  fontFamily: undefined, // undefined = system default in React Native StyleSheet

  // ─── Font Sizes ──────────────────────────────────────────────────────────────

  // Web: font-size: 40px (.heading h1)
  heading1: 40,

  // Web: font-size: 32px (.heading h1 on mobile ≤760px)
  heading1Mobile: 32,

  // Web: font-size: clamp(18px, 2vw, 22px) (.brand)
  brand: 20,

  // Web: font-size: 23px (.modal-head h2)
  modalTitle: 23,

  // Web: font-size: 17px (.task-title)
  taskTitle: 17,

  // Web: font-size: 16px (.profile strong)
  profileName: 16,

  // Web: font-size: 15px (.heading p, .search, nav not specified)
  body: 15,

  // Web: font-size: 14px (.filter-btn, .summary)
  small: 14,

  // Web: font-size: 13px (.field label, .tip strong, .profile span source)
  label: 13,

  // Web: font-size: 12px (.meta, .priority, .count, .tip span)
  xs: 12,

  // Web: font-size: 20px (.search-icon)
  searchIcon: 20,

  // ─── Font Weights ─────────────────────────────────────────────────────────────
  // Note: React Native fontWeight is a string

  // Web: font-weight: 400 (base)
  regular: '400',

  // Web: font-weight: 650 (.nav-label) — React Native rounds to 600 or 700
  semibold: '600',

  // Web: font-weight: 750 (.filter-btn) — React Native rounds to 700
  bold: '700',

  // Web: font-weight: 800 (.brand, .task-title, .add-btn, .avatar, .field label, .btn)
  extrabold: '800',

  // Web: font-weight: 900 (.priority badge)
  black: '900',

};

export default typography;
