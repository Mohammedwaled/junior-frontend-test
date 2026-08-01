/**
 * Shadow system — converts CSS box-shadow values to React Native equivalents.
 *
 * React Native shadows require two approaches:
 *   - iOS: shadowColor, shadowOffset, shadowOpacity, shadowRadius
 *   - Android: elevation
 *
 * Each shadow object is a flat style spread: { ...shadows.card }
 */

const shadows = {

  // Web: box-shadow: 0 8px 24px rgba(23,33,58,.06)
  // Used on: task cards, search input
  card: {
    shadowColor:   'rgba(23,33,58,1)',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius:  12,
    elevation:     3,
  },

  // Web: box-shadow: 0 12px 24px rgba(84,60,244,.22)
  // Used on: "+ Add Task" primary button
  primaryBtn: {
    shadowColor:   'rgba(84,60,244,1)',
    shadowOffset:  { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius:  12,
    elevation:     6,
  },

  // Web: box-shadow: 0 24px 60px rgba(14,22,43,.20)
  // Used on: modal box
  modal: {
    shadowColor:   'rgba(14,22,43,1)',
    shadowOffset:  { width: 0, height: 12 },
    shadowOpacity: 0.20,
    shadowRadius:  30,
    elevation:     20,
  },

  // No visible shadow (resets / cards without shadow)
  none: {
    shadowColor:   'transparent',
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius:  0,
    elevation:     0,
  },

};

export default shadows;
