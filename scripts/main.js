
/**
 * Banner Slider
 * 
 * Handles everything involving the banner on the top of the page, including making the images
 * and text shift every few seconds
 */

const TITLEINDEX = 1;
const TAGLINEINDEX = 2

const slider = document.querySelector('.banner-slider');
const bannerTitle = document.getElementById('banner-title')
const bannerTagline = document.getElementById('banner-tagline')

const bannerUrls = [
    ['images/animbanner.png','Premier League Speedcubers',"Tagline Text Tagline text jsda\n\nfkhgsldfkjghsdfl\nkjghsdflkjghsdflkgjhs\ndflgj hsdflkj g<br>hsldjkf hgdslk "],
    ['images/banner2.png','title2','tagline2'],
    ['images/banner3.png','title3','tagline3'],
    ['images/banner4.png','title4','tagline4']
];
const bannerShiftSeconds = 5;

// create and append the image elements dynamically
bannerUrls.forEach((banner, index) => {
    const bannerImage = document.createElement('div');
    bannerImage.className = 'banner-image';
    bannerImage.style.backgroundImage = `url(${banner[0]})`;
    if (index === 0) {
        bannerImage.classList.add('active'); // make sure page loads with visible image
        bannerTitle.textContent = bannerUrls[0][TITLEINDEX]
        bannerTagline.textContent = bannerUrls[0][TAGLINEINDEX]
    }
    slider.appendChild(bannerImage);
});

const images = document.querySelectorAll('.banner-image');
const totalImages = images.length;
let currentIndex = 0;

function changeBanner() {
    //new
    bannerTitle.classList.remove('show');
    bannerTagline.classList.remove('show');

    setTimeout(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add('active');
        
        bannerTitle.textContent = bannerUrls[currentIndex][TITLEINDEX]
        bannerTagline.textContent = bannerUrls[currentIndex][TAGLINEINDEX]

        bannerTitle.classList.add('show');
        bannerTagline.classList.add('show');
    }, 500);

}

bannerTitle.classList.add('show');
bannerTagline.classList.add('show');

setInterval(changeBanner, bannerShiftSeconds * 1000); // Change image every 5 seconds



/**
 * Event Info Popup
 * 
 * Handles the popup that appears when you click one of the events to get more information about it
 */

const figures = document.querySelectorAll('.event-figs figure');

// Popup elements
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const popupTitle = document.getElementById('popup-title');
const popupDescription = document.getElementById('popup-description');
const closeBtn = document.getElementById('close-popup');

// Content data for each event
const eventData = [
    {
        imageSrc: 'images/cubicle.png',
        title: 'Cubicle Champs',
        description: 'Description for Cubicle Champs',
        backgroundImage: 'url(images/background1.jpg)'
    },
    {
        imageSrc: 'images/scs.png',
        title: 'SCS Showdown',
        description: 'Description for SCS Showdown',
        backgroundImage: 'url(images/background2.jpg)'
    },
    {
        imageSrc: 'images/happyfeet.png',
        title: 'Penguin League',
        description: 'Description for Penguin League',
        backgroundImage: 'url(images/background3.jpg)'
    },
    {
        imageSrc: 'images/prime.png',
        title: 'Max Park',
        description: 'Description for Max Park',
        backgroundImage: 'url(images/background4.jpg)'
    }
];

// Function to open popup
function openPopup(index) {
    const event = eventData[index];
    document.body.style.backgroundImage = event.backgroundImage;
    popupImage.src = event.imageSrc;
    popupTitle.textContent = event.title;
    popupDescription.textContent = event.description;
    popup.style.display = 'block';
}

// Event listeners for figures
figures.forEach((figure, index) => {
    figure.addEventListener('click', () => {
        openPopup(index);
    });
});

// Close popup
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.style.backgroundImage = '';
});
