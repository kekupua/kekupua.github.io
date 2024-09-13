---
layout: project
type: project
image: images/questboards.png
title: Questboards Final Project
permalink: projects/questboards
# All dates must be YYYY-MM-DD format!
date: 2018-05-01
labels:
  - Web
  - React
  - Meteor
  - MongoDB
summary: For the course Software Engineering I at University of Hawaii at Manoa, I completed a project for helping connect users around the university campus to complete short-term jobs.
---

<img class="ui image" src="../images/Homepage.png" alt="home questboards" style="margin:0 auto; display: block">

For this project, the goal was to create an application to link up people around the University of Hawaii Manoa campus to complete short term jobs. The inspiration of this application was the fact that many college students struggle for money, have free time at school, but maybe can't take on another part-time job outside of campus. Using Questboards, students and faculty alike could link up to complete jobs. This would benefit the Quest requester and the Quest completer as the Quest gets completed and the completer gets some petty cash.

The majority of this application was built using the React JS framework, Semantic UI, and a MongoDB back-end. The application was then deployed online using Galaxy and Meteor.

The Application can be found working: [Here.](https://questboards.meteorapp.com)

During development, I focused mainly on the front-end development but also worked a bit into the back-end. First, I designed the landing page which has two cards to redirect users into creating a Quest or searching for a Quest. If the user wants to create a Quest, they are asked to sign in or create an account. When the user creates an account, they first create a profile with their skills and information so they can start completing Quests.

Next, I completed the Questboard page which lists all Quests. If the user is searching for a Quest, they are taken to the Questboard which lists the available and pending Quests. I designed the React components to list all available Quests by pulling information from the database collection reserved for Quests. These components are Semantic UI Cards with little colored borders at the top to indicate their status. If the border is green, the Quest is open. If the border is yellow, the Quest is pending, meaning there is an assignee but the Quest has not been completed. If the border is red, the Quest is closed or completed.

<img class="ui image" src="../images/listing.png" alt="quest listings" style="margin:0 auto; display: block">

I also completed the Quest info page. This Quest info page is fairly simple, it simply lists the information for the Quest as set by the Quest requester. It also contains three buttons, Edit Quest, Request, and Done. The Edit Quest button only appears for the Quest requester and allows the Quest requester to edit the Quest details. The Request button appears while the Quest is open and allows users to assign themselves to a Quest they find a liking for. The Done button appears for the Quest requester when the Quest is pending. When the Quest requester affirms that the Quest has been completed, they can hit the Done button to close the Quest.

For this project, I also contributed heavily towards the Project management and deployment through Github issues and Galaxy. For this project, we completed three milestones in which I helped create issues for and track our progress for those issues. As for the deployment, we used Galaxy and I handled all deployments throughout the course of this project.

<img class="ui image" src="../images/deploy.png" alt="galaxy deploy" style="margin:0 auto; display: block">

Through the course of working on this project, I've had the pleasure of learning more about Software engineering. Design principles, project management, and code quality are just a few of the topics I've studied through working on this project. For this application, I worked on designing a lot of the front-end pieces and workflow of the site. When completing this tasks, I had to picture the user experience and build the application to best support an ease of use for the user. Also, I improved heavily on writing documentation as we had to track all of our work in Github issues and constantly maintain an active piece of documentation to list the improvements to our application. The documentation for our website can be found: [Here.](https://the-artists.github.io)

The source code for this project can be found: [Here.](https://github.com/the-artists/quest-boards)
