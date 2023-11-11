require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMogoose = require("passport-local-mongoose");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const findOrCreate = require("mongoose-findorcreate");
const bodyParser = require("body-parser");
let userId="";
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Thisisalittlesecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const connectDB = async () => {
  // console.log(process.env.MONGO_URI);
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://anuskamitra2001:resumeBuilder@cluster0.0vgpzbc.mongodb.net/resumeDB?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB connect: ${conn.connection.host}`);
  } catch (error) {
    console.log(`error :${error}`);
    process.exit();
  }
};
connectDB();

const UserSchema = new mongoose.Schema({
  googleId:String,
  email: String,
  password: String,
});
const ResumeSchema=new mongoose.Schema({
  userId:String,
  basicInfoDetail:{
    firstName: String,
    lastName: String,
  }
})

const basicAndWorkSchema=new mongoose.Schema({
  userId:String,
  basicInfoDetail:{
    detail:{ 
    photo:String,
  firstName: String,
  lastName: String,
  linkedIn: String,
  github: String,
  phone: String,
  email: String, 
  }},
  workExpDetails:{
   details: [{ 
    title: String,
      companyName: String,
      certificationLink: String,
      startDate: Date,
      endDate: Date,
      location: String
  }]},
  
  projectDetails:{
    details:[{ 
    projectName: String,
    overview: String,
    deployedLink: String,
    github: String
  }]},
  educationDetails:{
    details:[{ 
    degree: String,
    instituteName: String,
    startDate: Date,
    endDate: Date,
    marks: Number
}]},
achievementDetails:{
  points:[String]
},
summayDetails:{
  detail:String
},
otherDetails:{
  detail:String

}
})
// const basicInfoSchema=new mongoose.Schema({
//   userId:String,
//   basicInfoDetail:{ 
//     photo:String,
//   firstName: String,
//   lastName: String,
//   linkedIn: String,
//   github: String,
//   phone: String,
//   email: String, 
//   }
// })
// const workExpSchema=new mongoose.Schema({
//   userId:String,
//   workExpDetails:[{ 
//     title: String,
//       companyName: String,
//       certificationLink: String,
//       startDate: Date,
//       endDate: Date,
//       location: String
//   }]
// })

// const projectSchema=new mongoose.Schema({
//   userId:String,
//   projectDetails:[{ 
//     projectName: String,
//     overview: String,
//     deployedLink: String,
//     github: String
//   }]
// })

// const educationSchema=new mongoose.Schema({
//   userId:String,
//   educationDetails:[{ 
//       degree: String,
//       instituteName: String,
//       startDate: Date,
//       endDate: Date,
//       marks: Number
//   }]
// })
// const achievementSchema=new mongoose.Schema({
//   points:[String]
// })

// const summarySchema=new mongoose.Schema({
//   detail:String
// })
// const othersSchema=new mongoose.Schema({
//   detail:String
// })


UserSchema.plugin(passportLocalMogoose, {
  usernameField: "email",
});
UserSchema.plugin(findOrCreate);
const User = new mongoose.model("user", UserSchema);

const BasicAndWork=new mongoose.model("basicAndWork",basicAndWorkSchema);


passport.use(User.createStrategy());


passport.serializeUser((user,cb)=>{
    // document(null,user)
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username

      });
    });
})
passport.deserializeUser((user,cb)=>{
    process.nextTick(function() {
      return cb(null, user);
    });
})

passport.use(new GoogleStrategy({
  clientID:"926395362382-vjmus1039poagqi7nd6fci96rqvddjkl.apps.googleusercontent.com",
  clientSecret:"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",
  callbackURL: "http://localhost:8000/auth/google/resume",
  userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, async (err, user)=> {
    if(user){
      userId=user._id;
      console.log(userId)
      }
    return cb(err, user);
  });

}
));

app.get("/fetchdata",async(req,res)=>{
  try {
    const foundBasicAndWork = await BasicAndWork.findOne({ userId:userId });
    if (foundBasicAndWork) {
     console.log("user found"+ foundBasicAndWork)
        res.send(foundBasicAndWork);
     } else {
       console.log("no user found")
     }
  } catch (err) {
      res.status(500).send("Internal error");
    }

})
app.get("/auth/google",
  passport.authenticate('google', { scope: ['profile'] }));//pue passport to authenticate the profile by using google stategy wich we have set up above 

//google will send the user to auth/google/resume route after authenticating the user by google strategy.

app.get("/auth/google/resume",   //this will locally authenticate the user 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    console.log("in auth/google/resume");
    // Successful authentication, redirect home.
     res.redirect("http://localhost:3000/resume");
  });


app.get("/", function (req, res) {
  console.log("root");
  res.send("root");
});
 app.post("/api/save-data",async(req,res)=>{
  const formData=req.body;
  console.log("--------------------------------------------------------------");
  for (let key in formData) {
    console.log(key, formData[key]);
  }
  console.log("--------------------------------------------------------------");
  console.log("detail   "+JSON.stringify(formData["Basic Info"]));
  console.log("detail------   "+JSON.stringify(formData["Basic Info"]["detail"]));

  const basicInfo=formData["Basic Info"];
  const workExp=formData["Work Experience"];
  const project=formData["Project"];
  const education=formData["Education"];
  const achievement=formData["Achievements"];
  const summary=formData["summary"];
  const other=formData["Others"];

  console.log("in savedata babsicInfoDetail="+JSON.stringify(basicInfo));

    console.log("api/save-data"+userId);
    const filter = { userId:userId };
    // const update = {fName:firstName,lName:lastName};
    let update={ basicInfoDetail: basicInfo,workExpDetails:workExp,projectDetails:project,educationDetails:education,achievementDetails:achievement,summayDetails:summary,otherDetails:other}
    await BasicAndWork.countDocuments(filter); 
    let doc = await BasicAndWork.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true 
    }).then(response=>{
      console.log(response);
    });
        
 })
//  app.get("/api/save-data",function(req,res){
//   res.send("hello");
//   console.log(req.body);
// })
app.get("/register", async (req, res) => {
  res.send("eello");
});
app.post("/register", async (req, res) => {
  User.register(
    { email: req.body.email },
      req.body.password,
    function (err, user) {
      if (err) {
        console.log("error from register  " + err);
        res.status(400).send(err);
      } else {
        console.log("user    "+user)

        passport.authenticate("local")(req, res, function () {
          //this callback function will only be called after successful authentication of user,meanse we avee successfully managed to save a cookie to save their current logged in session.
          res.status(200).send("successfully registered");
        });
      }
    }
  );
  // try {
  //   const { email, password } = req.body;
  //   console.log(email);
  //   console.log(password);
  //   const newUser = new User({ email: email, password: password });
  //   await newUser.save()
  //   res.send(true);
  // } catch (error) {
  //   res.send(false);
  // }
});

app.get("/logout",function(req,res){
  req.logout();
  res.status(200).send("logged out");
})

app.post("/login", function(req, res){
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  console.log("from login prinint user "+user);
  req.login(user, function (err) {
    if (err) {
      console.log("error from login " + err);
      res.status(400).send(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        console.log("found")
        //this callback function will only be called after successful authentication of user,meanse we avee successfully managed to save a cookie to save their current logged in session.
        res.status(200).send("successfully loggedin");
      });
    }
  });

  // const { email, password } = req.body;
  // try {
  //   const findUser = await User.findOne({ email: email });
  //   if (findUser) {
  //     if (findUser.password == password) {
  //       res.status(200).send("User successfully loggedin");
  //     }
  //     else{
  //       res.status(400).send("Password did not match");
  //     }
  //   } else {
  //     res.status(400).send("EmailId not found");
  //   }
  // } catch (err) {
  //   res.status(500).send("Internal error");

  // }
});
const port = process.env.PORT || 8080;
app.listen(process.env.PORT, function (req, res) {
  console.log("listening");
});
