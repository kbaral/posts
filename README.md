# Post
You will be able to CREATE, READ, UPDATE, and DELETE posts.
This application has two modules, admin and customer
You can login/register as an admin and create, update, delete posts.
As a reader, we can only read the posts. 



## Technology Used
* .NET Core Web API
* React js in ES2016
* mongoDB

## Setup

Set up the API / UI
After we download the folder. <br />
Go to that folder in the command line or  <br />
use VS Code to open the folder and press (ctrl + ~) to open the terminal.  <br />
Please make you are on folder that you just downloaded.<br />
Use the following command.

```powershell
dotnet restore
dotnet dev-certs https --clean
dotnet dev-certs https --trust
dotnet run
```
This will run the web api on the port https://localhost:5001/
This app is created using dot net core and react.
