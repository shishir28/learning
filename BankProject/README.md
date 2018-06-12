# NexPay Bank Project

This is sample project for code challenge ... 

It uses dotnet core 2.0 ( https://github.com/dotnet/core)  backend and 
It uses Angular 5 https://angular.io/ for frontend. 

Prerequisite
###  Prerequisite:
Install Dotnet core 2.0 SDK  (https://www.microsoft.com/net/download/windows)
NodeJs and  NPM  (https://nodejs.org/en/download/)
Angualr 5  (https://angular.io/guide/setup)
Angualr CLI (https://cli.angular.io/) 


###  To Build and Run the Project:
Clone the App from Github
Go to Src folder 
Run dotnet restore
Got to src\BankApp.Web.Ng 
Run npm install on command prompt 
run ng build  on command prompt
Got to src\BankApp.Web.App
Specify folder location from your machine where file will be create  for DBFilePath in appsettings.json appsettings.Development.json 
run dotnet build on command prompt
Open the web app in http://localhost:5000
To run the test cases in dotnet 
Got to src\BankApp.Test
run dotnet test on command prompt

###  BSB and Account number format 
Application does not call any third party API to validate BSB and account numbers 
It accepts 6 digit BSB
It accepts 6-10 digit Bank Account numbers