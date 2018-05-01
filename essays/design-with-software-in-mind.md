---
layout: essay
type: essay
title: Design with Software in Mind
# All dates must be YYYY-MM-DD format!
date: 2018-04-30
labels:
  - Software Engineering
  - Career
  - Design
---

## Design for the User
Any good product focuses on two points of contention, functionality and design. Functionality allows your product have to purpose and design allows your product to be used. The design of a product can make development easier and allow for greater functionality. Some design paradigms such as Model-View-Controller and Factory design methods allow for an abstraction of information that removes the ability for developers to run into problems. For the Model-View-Controller or MVC methodology, you can separate the components of an application into smaller, more digestable sections so that debugging problems can be simplified and streamlined.

## Work Smarter not Harder
In my limited role as a software engineer, certain application design patterns have arose. For example, in any of the meteor or react applications that we wrote, all of our applications had a navigational bar at the top of the page. This can be known as a Template Method. This Template Method utilizes blocks of reusable code that make developing new modules a breeze. By having the navigational bar as a reusable module, we can spend time working on other features. Another example of structural design patterns is the encapsulation of classes in our React apps. For each page and each component we create a new file titled appropriately to the page or component name. This allows for the separation of classes where each page or component is its own file. We can then pull all these components and pages together in a final rendering, which in the case of our React Apps is the App component itself. This App component ties together all the pages and the pages tie together all the components. By creating encapsulated pieces of code, we abstract unnecessary information that makes debugging difficult. By saving time on debugging, we can all complete our work faster and go home earlier.
