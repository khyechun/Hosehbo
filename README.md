[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=453411&assignment_repo_type=GroupAssignmentRepo)






# :wave: is216-project

**Table of Contents** 

* [Project Overview](#Project-Overview)
    + [Solution Architecture](#Solution-Architecture)
    + [Business Diagram](#Business-Diagram)
* [Problem Statement](#Problem-Statement)
* [Inspiration](#Inspiration )
* [Target Audience (TA)](#Target-Audience)
* [Value Proposition](#Value-Proposition)
* [Running Our Web Application (for Developers)](#Setup)
* [Deploying Our Web Application (for Developers)](#Deployment)
* [Walkthrough of Our Web Application](#Walkthrough)
* [X-Factors](#X-Factors)



## 😍 Figma Design 

Link to the figma design can be found here: https://www.figma.com/file/zuoJKFA4QEbNig1qKv3Y1q/WAD2-Final?node-id=348%3A2




## Project-Overview

![hosehbo](https://user-images.githubusercontent.com/53822560/141645934-f3a7429b-2514-45ca-a712-404af2760cfb.png)

Hosehbo is an application that allows users with like-minded interests to connect together and arrange for activities together. 

Due to the current pandemic, opportunities for social interactions are limited and it is difficult to connect with new people. This can result in an increase in loneliness and have a negative effect on one’s mental health. Therefore, through our application, we aim to tackle this problem by fostering close knitted communities for Singaporeans to connect together based on similar interests. 



   ### Solution-Architecture
    
    
![architecture_diagram](https://user-images.githubusercontent.com/53822560/141654074-ac637975-031d-48a9-b087-062e85a8d213.png)





   ### Business-Diagram
This is the workflow of Hosehbo. After a user registers, he would be directed to the homepage where he can create activity, view recommended activities based on his    interests, search for an activity or access his profile page. If the user chooses to create an activity, after entering the relevant information, he would be able to copy the invitation link that would lead other users to the newly created activity page, where they would be able to join the activity. If the user accesses his profile page, he        would be able to view his past and upcoming activities, log out, as well as view, delete and add new interests to his profile.

   
![WAD workflow diagram](https://user-images.githubusercontent.com/53822560/141653532-1a336689-d595-499a-9959-07f4d26f08e0.png)







## Problem-Statement 

Based on a research conducted by DukeNUS, it stated that younger adults aged 35 and under, were more likely to experience psychological distress. Furthermore, it has also been discovered that 1 in 3 adults has fallen into anxiety and depression due to the current pandemic. Interventions implemented by the governments such as lockdowns, quarantine and social distancing have an adverse impact on the mental well-being of people. Hence, uncertainty about the current pandemic coupled with the social isolation has escalated the burden of psychological distress. 

## Inspiration 

We decided to brainstorm some creative solutions to tackle this problem and based on our research, we found that hobbies that connect you with others can bring the added benefit of social support, which can bring stress relief and meaning to life in a fun way. 

In addition, we realised that there aren't many platforms for Singaporeans to connect with people via similar interests. An existing application out there would be Meetup.com, however, we realised that the application is not actually free to use hence activities listed in Meetup.com are normally events/paid activities such as coaching lessons. However, in our application, we wanted to focus more on spontaneous activities, encouraging locals with similar interests to meet up and partake in activities together. Activities range from outdoor activities such as hiking to online games! The idea is to foster close knitted groups for locals to forge meaningful social connections.



## Target-Audience: 

* Targeted Age Group: Young Adults, ages 18-35
* Region and Country: Singapore
* Gender: Welcome to anybody!



![persona](https://user-images.githubusercontent.com/53822560/141646396-8ea278bf-79b2-4612-8ecd-db14b92572a9.png)



## Value-Proposition 

Through our application, users will be able to: 
1. Create activities of their interest and connect with people
2. Partake in activities with other people who shares similar interests
3. View recommended activities based on their preferred interest
4. View activities near their location or other ongoing popular activities!

Activities can range from outdoor activities such as hiking to online games! Hence, users would be able to forge meaningful connections with like-minded individuals and be part of a close knitted community!



# Setup
## 🤓 Running Our Web Application (for Developers) 

1. To publish and install packages to and from the public npm registry or a private npm registry, you must install Node.js and the npm command line interface using either a Node version manager or a Node installer.


![node](https://user-images.githubusercontent.com/53822560/141650919-cf2a79d9-c988-439d-8cce-afadac0a9c6a.png)


2. Open a command prompt (or PowerShell), and enter the following:
```
    node -v
```

3. The system should display the Node.js version installed on your system. You can do the same for NPM:
```
    npm -v
```

4. Having installed Node.js, you will be required to install Vue Cli as well, which is the front-end framework used for the application
```
    npm install -g @vue/cli
    # OR
    yarn global add @vue/cli
```


5. Clone the repository from Github



6. Having cloned the repository successfully, execute the following commands to run the app on your localhost
```
   npm install
   npm run build 
   node server
```




# Deployment
## 💻 Deploying Our Web Application (for Developers) ##


* Our app is deployed on Heroku, a container-based cloud Platform as a Service (PaaS), which gives developers the freedom to focus on their core product without the distraction of maintaining servers, hardware, or infrastructure.


* The required steps to deploy an app on Heroku is shown below. If you do not have Heroku installed, kindly visit the following link first: https://devcenter.heroku.com/articles/heroku-cli 


Step 1. Initialize a git repository in a new or existing directory
```     
    heroku login
    git init
    heroku git:remote -a hosehbo 
```

Step 2. Commit your code to the repository and deploy it to Heroku using Git.

```
    git add .
    git commit -am "version 1"
    git push heroku master
```



# Walkthrough
## 🤓 Walkthrough of Our Web Application  ##

1. Upon visiting the app for the first time, users are recommended to first create an account so that the app can provide a more tailored user experience

![register](https://user-images.githubusercontent.com/53822560/141652699-082d99ec-c058-4a30-a8de-6a995ab3c65c.png)


2. After keying in their personal details, users are also prompted to indicate some of their personal interest.

![select_interest](https://user-images.githubusercontent.com/53822560/141652779-6f8c3fd9-3846-4b73-934d-ef94d8438efb.png)


3. Having successfully created an account, users will be redirected to the home page where they can search for activities and view recommended activities!

![Homepage](https://user-images.githubusercontent.com/53822560/141652803-a748ab47-5f75-4d7c-811a-ee768f4b7992.png)
![recommended activities](https://user-images.githubusercontent.com/53822560/141652804-9d37f9b4-b6ea-4baa-b7f8-0d56c15a1426.png)

4. If a user is keen about an activity, he/she can click on it to view additional details and join the activity
![activity_details](https://user-images.githubusercontent.com/53822560/141652866-54f5ff27-fce5-4c28-bcec-2e38274315c6.png)

5. Users are also allowed to create an activity to invite friends! 
![createactivity0](https://user-images.githubusercontent.com/53822560/141652933-7c6a6b72-3bb5-4594-9842-a7891e1a96cf.png)


6. Users will be required to specifiy if the activity will be online/physical

![createactivity1](https://user-images.githubusercontent.com/53822560/141652944-0ac5c9c2-df54-455b-aaad-586f095d80b4.png)


7. To create an activity, users will be required to fill up additional details as well such as : Activity Name, Start Date, Start Time etc.
![createactivity2](https://user-images.githubusercontent.com/53822560/141652978-389a0bba-8a5f-42f3-ab33-af98a547e213.png)


8. After filling up the necessary details, users will be shown a preview of their activity that they have created! 
![activitypreview](https://user-images.githubusercontent.com/53822560/141653091-76630609-2a42-4cef-9a85-09dca78121d7.png)


9. If users would like to view the upcoming or past activites that they have join, they can simply do so by clicking on "Profile" button 

![myprofile_activities](https://user-images.githubusercontent.com/53822560/141672698-e1661ec3-4b2f-4848-8bd9-0142586bdc12.png)


10. In addition, users can also edit their personal interests on the Profile Page

![myprofile_interest](https://user-images.githubusercontent.com/53822560/141672739-77bf733f-382e-42ed-8cf5-baff686565ed.png)




## X-Factors
| Item  | Justification |
| ------------- | ------------- |
| Github  | Our group plans to split work in such a way that each member owns certain components/parts of our project web application. We will use GitHub to regularly check in and merge our source code so as to exercise continuous integration.  |
| Vue CLI  | Vue.js uses a component-based architecture, thereby separating large chunks of code into smaller components. In addition, in Vue.js, everything is a component, and each component is written with HTML, CSS, and JavaScript, thereby encouraging readability and simplicity.  |
| Sass  | Sass both provides a simpler, more elegant syntax for CSS and implements various features that are useful for creating manageable stylesheets.  |
| MongoDB  | MongoDB uses a non relational database, allowing us to easily store and retrieve data dynamically.   |
| Cloud Deployment  | We will deploy our web application to Heroku and host it live. Users can visit our website via the public IP address or url provided after the cloud deployment.  |


