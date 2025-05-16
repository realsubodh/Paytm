const express = require("express");
const rootRouter = require("./routes/index")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
// remember cors order matters you have to must put it on the top, like in the current place



app.use("/api/v1", rootRouter)
// all requests coming in /api/v1 will go in mainRouter which is normally the index.js file in routes 
// more production way of writing the code, like u can directly move the api request in version two from creating a new similiar route request
// this is just a better structuring of the app thats it, read the code in mainRoute u will understand each and everything.



/*  two router api we needed
one for /api/v1/user/signup 
/api/v1/user/signin
/api/v1/user/changepassword.....
*/

/* second one is
 /api/v1/account/transferMoney
 /api/v1/account/balance
*/


app.listen(3000, () => {
    console.log("Server running on port 3000");
  });