// 



import express from "express"; //importing express to use it as a backend framework
import axios from "axios";  //importing axios from npm to use it for api requests
import bodyParser from "body-parser"; //importing the body parser miidlleware



const app = express(); //creating a blueprint from express module ! 
const port = 3000; // defining the local port that we will work on ! 
const API_URL = "https://secrets-api.appbrewery.com"; //the api that we will get the random secret from ! 


app.use(express.static("public")); //Using the public folder for the static files.


app.use(bodyParser.urlencoded({ extended: true })); //parsing the body of the request sended by the user 




// rendering the home page when the user request for "/" endpoint , and getting a random secret from the api to display
app.get("/", async (req, res) => {
 
    try {
        const result = await axios.get(API_URL + "/random" );
        console.log(result.data.secret); //the data we get from the api is alraedy parsed !
        //passing the data we get from the api to ejs by accessing the user and secret objects from the data from the response ! 
        res.render("index.ejs", {secret:result.data.secret, user: result.data.username }); 

      } catch (error) {
        console.log(error.response.data);
        res.status(500);
      }
        
});


// listening to the local port and starting the server ! 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


