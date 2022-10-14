# TASK MANAGER API 
1) Task manager api made using **NODE.JS** keeps track of different tasks for different users. A particular user can store information related to different tasks using task manager application.
2) Application connects with **MONGODB** database and uses **MONGOOSE** as the **ODM(OBJECT DOCUMENT MAPPER)** to interact with tha database.
3) Authentication of each and every **REST API** endpoint is performed using  **AUTH MIDDLEWARE** which ensures that user is authenticated and logged in before using the application. This 4) 4) 4) feature also ensures the cross user data privacy

## HOW TO RUN THE APPLICATION 
From the project root folder run the following command ---->  ***npm run dev***.
After running the above command your application would start running at local host server at port 3000

***note*** -> Before running the application there is a need to set environment following environment variables .(CREATE CONFIG FOLDER INSIDE ROOT FOLDER AND CREATE dev.env file inside it and then set the following environment variables)
                                                  **PORT**=3000
                                                  **JWT_SECRET**=thisismycourse
                                                  **MONGODB_URL**=mongodb://127.0.0.1:27017/task-manager-api