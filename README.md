# CodeforcesExtension
This extension helps you to have your profile data, getting time of upcoming contests and getting random questions from a given tag from codeforces.

## Setup Process:
0. Make sure you have node installed on your device
1. Clone the repository
2. To test it in a separate HTML Page, you can open the `popup.html` file in any browser
3. To add it to you browser, go to extensions page of your browser, enable developer mode, click on load unpacked extension, select the folder downloaded and run.
4. To change your own profile's detail, change the handle from 'picnic_1209' to your handle on line number 39 of popup.js.

## About Extension:
After installing it, when you open the extension, you would be provided with these following information

### 1. Details
![profile details](https://user-images.githubusercontent.com/65505331/125942668-49cbab19-b8c6-41b3-98f9-32a8c1f0b505.PNG)

For the user handle provided, the extension fetches the user's name, current rating, maximum rating and maximum ranking ever attained. The handle tab also has a hyperlink to the user's profile for quick navigation. (By default this would show information about the profile picnic_1209. To change it read the setup process step 4).

### 2. Upcoming Contests
![upcoming contests](https://user-images.githubusercontent.com/65505331/125943197-2ba3df7d-e017-4724-82f2-3b15f05faa16.PNG)

It fetches and lists the upcoming contests and time remaining for the start of it in a tabular format. The contest names have the contest page's link embedded in it, so to go to the contest page, just click on any of the contest name.

### 3. Questions for a Question Tag
![questions_empty](https://user-images.githubusercontent.com/65505331/125944063-d5928607-49cf-4500-b2b2-ffdc2810e761.PNG)

This can be used to search questions from a specific tag. Type your question tag and hit search to get 5 **random** questions from that tag. As it is random, searching again with the same tag will refresh the list.
Please note that there are only a few question tags available on codeforces and searching for anything different will result in no questions.

![questions_filled](https://user-images.githubusercontent.com/65505331/125944544-8c0716e3-a3ea-479f-a451-e95e43b8750e.PNG)

The question table has the name of the question, link to it and the rating of that question. (Currently the rating is fixed between 1600 to 1800 and will add custom range in future updates).

## Future Plans:
* Add dropdown list/use some algorithm to find out which valid tags are meant by the user from their input text and query based upon it
* Add functionality for the user to select custom range of problem difficulty

