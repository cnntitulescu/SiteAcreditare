// galerie.js - generat automat de update-galerie.ps1
// Ultima actualizare: 06.05.2026 12:54
// Cipru: 21 poze | Spania: 27 poze

const galleryDataCipru = [
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (10).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (11).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (12).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (13).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (14).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (15).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (16).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (17).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (18).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (2).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (5).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (6).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (8).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26 (9).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.29.26.jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.40.43 (1).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.40.43.jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.40.44 (1).jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.40.44.jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.40.45.jpeg', caption: '' },
  { src: 'poze/cipru/WhatsApp Image 2026-05-06 at 11.43.44.jpeg', caption: '' }
];

const galleryDataSpania = [
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.27.jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.28 (1).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.28 (2).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.28 (3).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.28 (4).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.28 (5).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.28 (6).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.28.jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.29 (1).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.29 (2).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.29 (3).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.29 (4).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.29 (5).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.29 (6).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.29 (7).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.29 (8).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.29.jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.30 (1).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.30 (2).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.30 (3).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.30 (4).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.30 (5).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.30 (6).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.30 (7).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.30.jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.31 (1).jpeg', caption: '' },
  { src: 'poze/spania/WhatsApp Image 2026-05-06 at 12.52.31.jpeg', caption: '' }
];
