import bond from "../images/bond.jpg";
import family_christmas from "../images/family_christmas.jpg";
import hearthstone_puzzle from "../images/hearthstone_puzzle.jpg";
import hike from "../images/hike.jpg";
import korea from "../images/korea.jpg";
import mom from "../images/mom.jpg";
import questboardsHome from "../images/qbHome.png";
import sophie from "../images/sophie.jpg";
import sue_sean from "../images/sue_sean.jpg";

const data = {
  intro: `Hi! My name is Sean Teramae. I'm originally from Honolulu, Hawaii and I graduated from the University of Hawaii at Manoa.\n
    I currently am employed in Irvine, CA working on exciting web technologies at NVIDIA.
    `,
  photos: [
    {
      src: family_christmas,
      title: "Family",
      caption: "My family and I.",
    },
    {
      src: bond,
      title: "Bond",
      caption: "His name is Bond!",
    },
    {
      src: hearthstone_puzzle,
      title: "Puzzle",
      caption: "One of the puzzles my girlfriend and I completed together.",
    },
    {
      src: hike,
      title: "Hike",
      caption: "A hike on the Eastern side of O'ahu.",
    },
    {
      src: korea,
      title: "Namsan Hike",
      caption: "A photo from the top of the Namsan Moutain in Seoul.",
    },
    {
      src: mom,
      title: "Seattle Trip",
      caption: "Me and my mom on a family vacation.",
    },
    {
      src: sophie,
      title: "Sophie",
      caption: "Our mix Labrador named Sophie!",
    },
    {
      src: sue_sean,
      title: "Dinner Date",
      caption: "My girlfriend and I out to dinner (pre-pandemic)",
    },
  ],
  projects: [
    {
      image: "/images/snapchatLogo.png",
      routerLink: "https://forbusiness.snapchat.com/",
      heading: "Snapchat BizX",
      subheading: "2022 - Present",
      description:
        "Meticulous design documentation, well-polished React views, a GraphQL-driven Java backend, and seamless integration with continuous deployment processes.",
      tags: [
        "web",
        "react",
        "design",
        "typescript",
        "web components",
        "API",
        "GraphQL",
        "java",
      ],
    },
    {
      image: "/images/randomHearthstoneLogo.jpg",
      routerLink: "/random-hearthstone",
      heading: "Random Hearthstone Card",
      subheading: "2021",
      description: "Designed a service for fetching random Hearthstone cards.",
      tags: [
        "web",
        "react",
        "design",
        "javascript",
        "web components",
        "API",
        "cache",
      ],
    },
    {
      image:
        "https://bnetcmsus-a.akamaihd.net/cms/blog_header/0v/0VK49FWI9ERR1607483275276.jpg",
      href: "https://diabloimmortal.com/en-us/",
      heading: "Diablo Immortal",
      subheading: "2020",
      description:
        "Developed a service to simplify development and CI/CD of the Diablo Immortal website.",
      tags: ["web", "react", "design", "javascript"],
    },
    {
      image: "https://wallpapercave.com/wp/wp5314393.jpg",
      href: "https://playwarcraft3.com/en-us/",
      heading: "Warcraft III Reforged",
      subheading: "October 2019",
      description:
        "Developed a service to simplify development and CI/CD of the Warcraft III Reforged website.",
      tags: ["web", "react", "design", "javascript"],
    },
    {
      image:
        "https://cdn.wccftech.com/wp-content/uploads/2018/10/wow-classic.jpg",
      href: "https://worldofwarcraft.com/en-us/wowclassic",
      heading: "World of Warcraft Classic",
      subheading: "August 2019",
      description:
        "Developed a service to simplify development and CI/CD of the World of Warcraft Classic page.",
      tags: ["web", "react", "design", "javascript"],
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Unity_Technologies_logo.svg/1200px-Unity_Technologies_logo.svg.png",
      href: "https://docs.google.com/presentation/d/1Fq33iFpxeSOrHOFJPtdoQnsjSe66GE3GTr_Dzruenvg/edit?usp=sharing",
      heading: "Unity Game Development",
      subheading: "May 2019",
      description:
        "A Unity project integrated with Machine Learning to develop new and exciting mini games.",
      contain: true,
      tags: ["Unity", "Native", "Tensorflow", "Machine Learning", "University"],
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Overwatch_League_logo.svg/1200px-Overwatch_League_logo.svg.png",
      href: "https://overwatchleague.com/en-us/",
      heading: "Overwatch League",
      subheading: "May 2018",
      description:
        "Returning as a 2nd year intern, I worked closely on the formation of the Overwatch League Franchise Website.",
      contain: true,
      tags: ["Web", "React", "Blizzard"],
    },
    {
      image: questboardsHome,
      href: "https://the-artists.github.io/",
      heading: "Questboards",
      subheading: "May 2018",
      description:
        "A project for helping connect users around the university campus to complete short-term jobs.",
      tags: ["Web", "React", "Meteor", "MongoDB"],
    },
    {
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.4vQcDh3AhM_ZLHZogJCzwgHaE8%26pid%3DApi&f=1",
      href: "https://github.com/kekupua/EE396/tree/master/tensorflow-for-poets-2",
      heading: "Rooms",
      subheading: "August 2017",
      description:
        "A machine learning application built on the Inception v3 Convolutional Neural Network for image recognition to gather classroom data.",
      tags: ["Android Studio", "Java", "Tensorflow", "Machine Learning"],
    },
    {
      image:
        "https://gameranx.com/wp-content/uploads/2016/03/Diablo-1024x640.jpg",
      href: "https://us.diablo3.com/en-us/",
      heading: "Diablo III Website",
      subheading: "May 2017",
      description:
        "As an intern, I contributed heavily to improvements for the Diablo III franchise website.",
      tags: ["Web", "Front-end", "Blizzard"],
    },
  ],
};

export default data;
