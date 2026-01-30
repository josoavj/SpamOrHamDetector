const fs = require('fs');
const path = require('path');

const src = String.raw`C:\Users\user\.gemini\antigravity\brain\2ca4f908-3d24-46cd-9685-38c7e7bdbd24\uploaded_media_1769766000333.png`;
const dest = String.raw`d:\DossierM2\ML\spam-detector\frontend\my-app\public\logo_mail.png`;

try {
    fs.copyFileSync(src, dest);
    console.log('File copied successfully to ' + dest);
} catch (err) {
    console.error('Error copying file:', err);
    process.exit(1);
}
