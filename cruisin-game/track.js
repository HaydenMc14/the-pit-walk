// ============================================
// RAW TRACK DEFINITION (YOUR INPUT SYSTEM)
// ============================================

const trackData = [
  {
    length: 300,
    curve: 0,
    elevation: 0,
    tilt: 0,
    width: 1.2,
    grip: 1,
    rumbleWidth: 0.15,
    rumbleLength: 20
  },
  {
    length: 300,
    curve: 0.8,
    elevation: 0.3,
    tilt: 0.2,
    width: 1.1,
    grip: 0.8,
    rumbleWidth: 0.2,
    rumbleLength: 30
  },
  {
    length: 300,
    curve: -0.8,
    elevation: -0.2,
    tilt: -0.2,
    width: 1.3,
    grip: 0.6,
    rumbleWidth: 0.25,
    rumbleLength: 40
  }
];

// ============================================
// GENERATED SEGMENTS (ENGINE USES THIS)
// ============================================

const track = [];
const SEGMENT_LENGTH = 10;

trackData.forEach(section => {
  let segmentCount = section.length / SEGMENT_LENGTH;

  for (let i = 0; i < segmentCount; i++) {
    track.push({
      curve: section.curve,
      elevation: section.elevation,
      tilt: section.tilt,
      width: section.width,
      grip: section.grip,
      rumbleWidth: section.rumbleWidth,
      rumbleLength: section.rumbleLength
    });
  }
});
