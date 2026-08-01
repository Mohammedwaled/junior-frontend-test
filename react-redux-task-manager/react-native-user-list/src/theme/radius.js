/**
 * Border radius values — extracted from the web app's CSS.
 * React Native uses `borderRadius` (number, not string).
 */

const radius = {

  // Web: border-radius: 7px (.checkbox)
  checkbox: 7,

  // Web: border-radius: 9px (.mobile-menu)
  menuBtn: 9,

  // Web: border-radius: 10px (.menu-btn, .close btn, .tip-icon, .priority badge)
  sm: 10,

  // Web: border-radius: 11px (.filter-btn, .icon-btn, .field input/select, .btn-secondary/.btn-primary)
  md: 11,

  // Web: border-radius: 12px (.nav-item)
  navItem: 12,

  // Web: border-radius: 13px (.add-btn, .search input)
  input: 13,

  // Web: border-radius: 14px (.tip card)
  tipCard: 14,

  // Web: border-radius: 15px (.task-card, .task-list .empty, .summary)
  card: 15,

  // Web: border-radius: 18px (.modal)
  modal: 18,

  // Web: border-radius: 50% (.avatar)
  circle: 9999,

  // Web: border-radius: 999px (.count badge)
  pill: 999,

};

export default radius;
