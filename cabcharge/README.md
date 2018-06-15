# Email Sender Project

This is sample project for code challenge... 

It uses dotnet core 2.0 (https://github.com/dotnet/core) backend and 
It uses Angular 6 https://angular.io/ for frontend. 


###  Prerequisite:
* Install Dotnet core 2.0 SDK  (https://www.microsoft.com/net/download/windows)
* NodeJs and  NPM  (https://nodejs.org/en/download/)
* Angular 6 (https://angular.io/guide/setup)
* Angular CLI (https://cli.angular.io/) 

###  To Build and Run the Project:
Clone the App from GitHub<br/>
Go to src folder <br/>
<br/>

1. Angular Project <br/>
* Got to src\CabChargeNG <br/>
* Execute npm install on command prompt <br/>
* Execute ng build  on command prompt<br/>
* To run the test cases in angular <br/>

* Go to src\CabChargeNG<br/>
* Execute run ng test  on command prompt<br/>

2. Dotnet  Project <br/>
* Go to src\CabChargeApp.Web.App<br/>>
* Execute dotnet restore on command prompt<br/>
* Execute dotnet build on command prompt <br/>
* You must build Angular project before running the Web App
* Execute dotnet run on command prompt <br/>
* Open the web app in http://localhost:5000<br/>
* To run the test cases in dotnet <br/>
* Go to src\CabChargeApp.Test<br/>
* Execute dotnet test on command prompt<br/>

### Important Notes 
* Application does not support attachments <br/>

* Multiple email address can be used  by putting those separated by comma like test@gmail.com, john.doe@gmail.com, jane.doe@gmail.com <br/>

* Mailgun expects to use real domain if email needs to be sent any email address. At the time of shipping  this code, configuration file  is pointing to sandbox domain and in case of sandbox domain email needs to added to "Authorized Recipients". As of now only authorized email address for mail gun for current API key is "shishir28@gmail.com" <br/>
* You can create your own API KEY and register any domain and then set these values appsettings.json (MailGunDomain and MailGunAPIKey) <br/>
* SendGrid does not have such restrictions though. <br/>
* Current logic (for fail over is simplified):Application try to send email through Mail Gun and if it fails then it try to use Send Grid.