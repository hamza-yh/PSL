
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
    ['assets/images/banner1.png','Premier Speedcubing League',"The Home of Professional Speedcubing\n\nFeaturing:\n• Head to head competition\n• Open Qualifiers\n• Competitive Rating Systems"],
    ['assets/images/banner2.png','Our Next Event','San Diego Open PSL Qualifiers\n\nMarch 22nd, 2025\n\n$1000 in Cash Prizes!'],
    ['assets/images/banner3.png','What Makes Us Special?','Compete in our open qualifiers to not only achieve\n WCA-recognized results,\
        but also compete for a\n chance to qualify for the PSL Invitationals: \nour 8-person, double elimination tournaments!']
];
const bannerShiftSeconds = 6;

// create and append the image elements dynamically
bannerUrls.forEach((banner, index) => {
    const bannerImage = document.createElement('div');
    bannerImage.className = 'banner-image';
    bannerImage.style.backgroundImage = `url(${banner[0]})`;
    if (index === 0) {
        bannerImage.classList.add('active'); // make sure page loads with visible image
        bannerTitle.innerHTML = bannerUrls[0][TITLEINDEX]
        bannerTagline.innerHTML = bannerUrls[0][TAGLINEINDEX]
    }
    slider.appendChild(bannerImage);
});

const images = document.querySelectorAll('.banner-image');
const totalImages = images.length;
let currentIndex = 0;

function changeBanner() {
    //new

    //comment out to pause the scrolling banner on whatever the number below is
    //if (currentIndex == 0){
    //    return;
    //}
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
        imageSrc: 'assets/images/cubicle.png',
        title: 'PSL Qualifiers San Diego',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nullam vulputate sit amet sapien et eleifend. Nullam pulvinar ut orci quis venenatis. Morbi a diam quis dolor varius ultrices. Etiam id congue quam. Proin at urna mi. Vestibulum posuere sapien vitae ex finibus venenatis.',
        backgroundImage: 'url(images/background1.jpg)',
        link: 'pages/pslsd.html'
    },
    {
        imageSrc: 'assets/images/coming_soon.png',
        title: 'PSL Qualifiers Michigan',
        description: 'Description for PSL MI',
        backgroundImage: 'url(images/background2.jpg)'
    },
    {
        imageSrc: 'assets/images/coming_soon.png',
        title: 'Penguin League',
        description: 'Description for Penguin League',
        backgroundImage: 'url(images/background3.jpg)'
    },
    {
        imageSrc: 'assets/images/coming_soon.png',
        title: 'PSL Qualifiers Las Vegas',
        description: 'Description for PSL LV',
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
    document.getElementById('popup-link').href = event.link;
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
