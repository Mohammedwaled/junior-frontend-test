/**
 * Spacing scale — derived from the web app's padding, margin, and gap values.
 *
 * Used consistently across all components so layout rhythm matches the web version.
 * Usage: spacing.md, spacing[16], etc.
 */

const spacing = {

  // ─── Base scale (pixels) ──────────────────────────────────────────────────────
  2:  2,
  4:  4,
  6:  6,
  7:  7,
  8:  8,
  9:  9,
  10: 10,
  12: 12,
  13: 13,
  14: 14,
  16: 16,
  17: 17,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
  26: 26,
  28: 28,
  30: 30,
  32: 32,
  36: 36,
  40: 40,
  42: 42,
  44: 44,
  46: 46,
  48: 48,
  52: 52,

  // ─── Named aliases (matching web intent) ──────────────────────────────────────

  // Web: padding: 28px 22px (sidebar outer padding)
  sidebarPaddingV: 28,
  sidebarPaddingH: 22,

  // Web: padding: 0 10px 24px (brand row)
  brandPaddingH:  10,
  brandPaddingB:  24,

  // Web: padding: 24px 10px (profile section)
  profilePaddingV: 24,
  profilePaddingH: 10,

  // Web: gap: 14px (profile row gap)
  profileGap: 14,

  // Web: padding-top: 24px; gap: 8px (nav section)
  navPaddingTop: 24,
  navGap:        8,

  // Web: padding: 12px 14px (nav item)
  navItemPaddingV: 12,
  navItemPaddingH: 14,

  // Web: gap: 12px (nav item internal gap)
  navItemGap: 12,

  // Web: padding: 16px (tip card)
  tipPadding: 16,

  // Web: gap: 12px (tip card internal)
  tipGap: 12,

  // Web: padding: 42px 44px (dashboard main)
  dashboardPaddingV: 42,
  dashboardPaddingH: 44,

  // Web: margin-bottom: 20px (header bottom margin)
  headerMarginB: 20,

  // Web: gap: 20px (header flex gap)
  headerGap: 20,

  // Web: margin-bottom: 18px (filter row margin)
  filterMarginB: 18,

  // Web: gap: 10px (filter row gap between buttons)
  filterGap: 10,

  // Web: gap: 12px (task list gap between cards)
  listGap: 12,

  // Web: padding: 17px 18px (task card)
  cardPaddingV: 17,
  cardPaddingH: 18,

  // Web: gap: 16px (task card internal)
  cardGap: 16,

  // Web: margin-top: 8px (meta row inside card)
  metaMarginT: 8,

  // Web: gap: 9px (meta row gap)
  metaGap: 9,

  // Web: gap: 9px (action buttons gap)
  actionsGap: 9,

  // Web: margin-top: 18px (summary banner)
  summaryMarginT: 18,

  // Web: padding: 16px 20px (summary banner)
  summaryPaddingV: 16,
  summaryPaddingH: 20,

  // Web: padding: 24px (modal box)
  modalPadding: 24,

  // Web: margin-bottom: 18px (modal head bottom margin)
  modalHeadMarginB: 18,

  // Web: margin-bottom: 16px (form field)
  fieldMarginB: 16,

  // Web: margin-bottom: 7px (field label)
  labelMarginB: 7,

  // Web: margin-top: 8px (modal actions)
  modalActionsMarginT: 8,

  // Web: gap: 10px (modal actions)
  modalActionsGap: 10,

};

export default spacing;
