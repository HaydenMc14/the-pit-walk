// ============================================
// RAW TRACK DEFINITION (your input)
// ============================================

const trackData = [
  { length: 200, curve: 0 },
  { length: 200, curve: 0.8 },
  { length: 200, curve: 0 },
  { length: 200, curve: -0.8 },
];

// ============================================
// GENERATED SEGMENTS (used by engine)
// ============================================

const track = [];

const SEGMENT_LENGTH = 10;

trackData.forEach(section => {
  let segmentCount = section.length / SEGMENT_LENGTH;

  for (let i = 0; i < segmentCount; i++) {
    track.push({
      curve: section.curve
    });
  }
});
