import sharp from 'sharp';
import toIco from 'to-ico';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, '..', 'public', 'icon-512x512.png');
const out = join(__dirname, '..', 'public');

const pngSizes = [16, 32, 48, 180, 192, 512];

// Generate PNG favicons
for (const size of pngSizes) {
  const name = size === 180 ? 'apple-touch-icon.png'
    : `favicon-${size}x${size}.png`;
  await sharp(src).resize(size, size, { fit: 'cover' }).png().toFile(join(out, name));
  console.log(`PNG ${name} (${size}x${size})`);
}

// Generate ICO from 32x32
const png32 = await sharp(src).resize(32, 32, { fit: 'cover' }).png().toBuffer();
const ico = await toIco(png32, { sizes: [16, 32, 48] });
writeFileSync(join(out, 'favicon.ico'), ico);
console.log('ICO favicon.ico (16+32+48)');

console.log('Done.');
