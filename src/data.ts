// Nav type
export type navLinkType = {
  label: string;
  url: string;
};

// Nav
const navLinks = [
  {
    label: 'Services',
    url: '#services',
  },
  {
    label: 'Projects',
    url: '#works',
  },
  {
    label: 'About',
    url: '#about-me-section',
  },
  {
    label: 'Testimonials',
    url: '#testimonials-section',
  },
  {
    label: 'Contact',
    url: '#contact-section',
  },
];
const navbarLinks = [
  {
    label: 'Home',
    url: '#app',
  },
  ...navLinks,
];

const socialLinks = [
  {
    label: 'GitHub',
    url: 'https://github.com/rono-007',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/Ranajoy-Nag',
  },
  {
    label: 'Email',
    url: 'mailto:iemrono2022@gmail.com',
  },
];

const resourceLinks = [
  {
    label: 'Shiuli (Live)',
    url: 'https://shiuli.vercel.app',
  },
  {
    label: 'GitHub Profile',
    url: 'https://github.com/rono-007',
  },
  {
    label: 'LinkedIn Profile',
    url: 'https://www.linkedin.com/in/Ranajoy-Nag',
  },
];

const heroText =
  "I'm Ranajoy Nag, an AI Engineer and Full-Stack Developer passionate about building intelligent systems and meaningful digital products.";

const locationPlace = `22°34'22.0"N 88°21'50.0"E`;
const locationCountry = 'Kolkata, West Bengal, India';

// cal.com
const dataCalNamespace = '30min';
const dataCalLink = '';
const dataCalConfig =
  '{"layout":"month_view", "theme": "dark", "brand": "#8C8C73"}';

export {
  socialLinks,
  resourceLinks,
  heroText,
  locationPlace,
  locationCountry,
  navLinks,
  navbarLinks,
  dataCalNamespace,
  dataCalLink,
  dataCalConfig,
};
