const download = document.querySelector('.download');
const dark = document.querySelector('.dark');
const light = document.querySelector('.light');
const qrContainer = document.querySelector('#qr-code');
const qrText = document.querySelector('.qr-text');
const shareBtn = document.querySelector('.share-btn');
const sizes = document.querySelector('.sizes');


dark.addEventListener('input', handleDarkColor);
light.addEventListener('input', handleLightColor);
qrText.addEventListener('input', handleQRText);
sizes.addEventListener('change', handleSize);
shareBtn.addEventListener('click', handleShare);

const defaultURL = 'http://www.nesmanpro.com';
let colorDark = '#fff',
    colorLight = '000',
    text = defaultURL,
    size = 300;

function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}

function handleLightColor(e) {
    colorLight = e.target.value;
    generateQRCode();
}

function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultURL;
    }
    generateQRCode()
}

async function generateQRCode() {
    qrContainer.innerHTML = '';
    new generateQRCode('qr-code', {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl();
}

async function handleShare() {
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], 'QRCode.png', {
                type: blob.type
            });

        } catch (error) {
            alert('Your browser doesnt support sharing');
        }
    }, 100)
}

function handleSize() {
    size = e.target.value;
    generateQRCode();
}

function resolveDataUrl() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const img = document.querySelector('#qr-code img');
            if (img.currentSrc) {
                res(img.currentSrc);
                return;
            }
            const canvas = document.querySelector('canvas');
        })
    })
}