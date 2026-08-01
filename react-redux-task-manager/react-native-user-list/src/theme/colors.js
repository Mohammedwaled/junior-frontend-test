/**
 * Color palette — extracted 1:1 from the web application's CSS files.
 *
 * Naming convention:
 *   - Descriptive names mirror the web's CSS class/variable intent.
 *   - Gradient pairs are arrays [start, end] for use with expo-linear-gradient.
 */

const colors = {

  // ─── App Background ──────────────────────────────────────────────────────────
  // Web: background: linear-gradient(180deg, #fbfcff 0%, #f7f8fc 100%)
  appBgStart: '#fbfcff',
  appBgEnd:   '#f7f8fc',
  appBg:      ['#fbfcff', '#f7f8fc'], // gradient pair

  // ─── Sidebar ─────────────────────────────────────────────────────────────────
  // Web: background: linear-gradient(180deg, #111a2d 0%, #0d1628 100%)
  sidebarBgStart: '#111a2d',
  sidebarBgEnd:   '#0d1628',
  sidebarBg:      ['#111a2d', '#0d1628'], // gradient pair

  // Web: border-bottom: 1px solid rgba(255,255,255,.11)
  sidebarDivider: 'rgba(255,255,255,0.11)',

  // Web: color: #d8deea (nav item default text)
  sidebarNavText: '#d8deea',

  // Web: color: #9ca7bb (muted text — profile subtitle, tip text)
  sidebarMuted: '#9ca7bb',

  // ─── Avatar ──────────────────────────────────────────────────────────────────
  // Web: background: linear-gradient(135deg, #6b4dff, #4e35e8)
  avatarBg:    ['#6b4dff', '#4e35e8'],

  // ─── Navigation Active Item ───────────────────────────────────────────────────
  // Web: background: linear-gradient(135deg, #5a41fa, #5136ef)
  navActiveBg: ['#5a41fa', '#5136ef'],

  // Web: background: rgba(255,255,255,.06) on hover
  navHoverBg:  'rgba(255,255,255,0.06)',

  // ─── Count Badge (inside nav items) ──────────────────────────────────────────
  // Web: background: rgba(255,255,255,.12)
  countBadgeBg: 'rgba(255,255,255,0.12)',

  // ─── Productivity Tip Card ────────────────────────────────────────────────────
  // Web: border: 1px solid rgba(255,255,255,.10)
  tipCardBorder: 'rgba(255,255,255,0.10)',
  // Web: background: rgba(255,255,255,.025)
  tipCardBg:     'rgba(255,255,255,0.025)',
  // Web: background: rgba(84,60,244,.26)
  tipIconBg:     'rgba(84,60,244,0.26)',

  // ─── Primary Accent ───────────────────────────────────────────────────────────
  // Web: #5540f5 / #5538f5 (used for active states, primary button, checkbox)
  primary:         '#5540f5',
  primaryAlt:      '#5538f5',

  // Web: background: linear-gradient(135deg, #5540f5, #4631e8)
  primaryBg:       ['#5540f5', '#4631e8'],

  // Web: box-shadow: 0 12px 24px rgba(84,60,244,.22)
  primaryShadow:   'rgba(84,60,244,0.22)',

  // Web: box-shadow: 0 0 0 4px rgba(84,60,244,.08) (focus ring)
  primaryFocusRing: 'rgba(84,60,244,0.08)',

  // ─── Dashboard / Content Area ─────────────────────────────────────────────────
  // Web: color: #17213a (main heading, task title)
  heading:    '#17213a',

  // Web: color: #8590a6 (heading subtitle)
  subtext:    '#8590a6',

  // ─── Borders & Inputs ─────────────────────────────────────────────────────────
  // Web: border: 1px solid #e6e9f1
  border:     '#e6e9f1',

  // Web: background: #fff / #fbfcff
  inputBg:    '#fbfcff',
  white:      '#ffffff',

  // Web: border-color: #bdb4ff (focus)
  focusBorder: '#bdb4ff',

  // ─── Task Filter Buttons ──────────────────────────────────────────────────────
  // Web: color: #4d5972
  filterText:         '#4d5972',

  // Active filter
  // Web: border-color: #c8c0ff; background: #f4f1ff; color: #5540f5
  filterActiveBorder: '#c8c0ff',
  filterActiveBg:     '#f4f1ff',
  filterActiveText:   '#5540f5',

  // ─── Task Card ────────────────────────────────────────────────────────────────
  // Web: box-shadow: 0 8px 24px rgba(23,33,58,.06)
  cardShadow:  'rgba(23,33,58,0.06)',

  // Web: color: #17213a (task title)
  taskTitle:   '#17213a',

  // Web: color: #8e98aa (completed title), text-decoration: line-through
  taskDone:    '#8e98aa',

  // Web: color: #8c97ab (meta row text — "Today • Open")
  metaText:    '#8c97ab',

  // Web: checkbox default border: #c6cedd
  checkboxBorder:    '#c6cedd',

  // ─── Priority Badges ──────────────────────────────────────────────────────────
  // High — red tones
  priorityHighText:   '#e94d5f',
  priorityHighBg:     '#fff0f2',
  priorityHighBorder: '#ffd7dc',

  // Medium — amber tones
  priorityMediumText:   '#e99a28',
  priorityMediumBg:     '#fff7e8',
  priorityMediumBorder: '#fbe0b1',

  // Low — green tones
  priorityLowText:   '#25a77a',
  priorityLowBg:     '#eafaf4',
  priorityLowBorder: '#cdeee1',

  // ─── Action Icon Buttons ──────────────────────────────────────────────────────
  // Web: color: #5540f5 (edit button icon)
  editIcon:   '#5540f5',

  // Web: color: #f04f5f (delete button icon)
  deleteIcon: '#f04f5f',

  // Web: background: #f7f8fc (hover state on icon buttons)
  iconBtnHover: '#f7f8fc',

  // ─── Task Summary Banner ──────────────────────────────────────────────────────
  // Web: background: linear-gradient(90deg, #f6f3ff, #f1eeff)
  summaryBg:     ['#f6f3ff', '#f1eeff'],

  // Web: border: 1px solid #e7e1ff
  summaryBorder: '#e7e1ff',

  // Web: color: #5f6680
  summaryText:   '#5f6680',

  // ─── Empty / Loading State ────────────────────────────────────────────────────
  // Web: border: 1px dashed #d8ddea
  emptyBorder: '#d8ddea',

  // Web: background: rgba(255,255,255,.55)
  emptyBg:     'rgba(255,255,255,0.55)',

  // Web: color: #8590a6
  emptyText:   '#8590a6',

  // Web: color: #5540f5 (empty icon)
  emptyIcon:   '#5540f5',

  // ─── Modal ────────────────────────────────────────────────────────────────────
  // Web: background: rgba(11,17,33,.45)
  modalOverlay: 'rgba(11,17,33,0.45)',

  // Web: color: #17213a (modal heading)
  modalHeading: '#17213a',

  // Web: color: #657087 (close button icon)
  modalClose:   '#657087',

  // Web: color: #4d5870 (field label)
  fieldLabel:   '#4d5870',

  // Web: color: #566178 (cancel button text)
  cancelText:   '#566178',

  // Mobile menu button background (web: #5538f5)
  menuBtn: '#5538f5',

};

export default colors;
