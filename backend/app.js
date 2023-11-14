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
const bcrypt = require("bcrypt");
const saltRound = 10;
let userId = "";
const connectDB=require("./config/db")
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



connectDB();

const UserSchema = new mongoose.Schema({
  userId: String,
  email: String,
  password: String,
});

const basicAndWorkSchema = new mongoose.Schema({
  userId: String,
  basicInfoDetail: {
    sectionTitle: String,
    detail: {
      photo: String,
      firstName: String,
      lastName: String,
      linkedIn: String,
      github: String,
      phone: String,
      email: String,
    },
  },
  workExpDetails: {
    sectionTitle: String,
    details: [
      {
        title: String,
        companyName: String,
        certificationLink: String,
        startDate: String,
        endDate: String,
        location: String,
      },
    ],
  },

  projectDetails: {
    sectionTitle: String,
    details: [
      {
        projectName: String,
        overview: String,
        deployedLink: String,
        github: String,
      },
    ],
  },
  educationDetails: {
    sectionTitle: String,
    details: [
      {
        degree: String,
        instituteName: String,
        startDate: String,
        endDate: String,
        marks: Number,
      },
    ],
  },
  achievementDetails: {
    sectionTitle: String,
    points: [String],
  },
  summayDetails: {
    sectionTitle: String,
    detail: String,
  },
  otherDetails: {
    sectionTitle: String,
    detail: String,
  },
});

UserSchema.plugin(findOrCreate);
const User = new mongoose.model("user", UserSchema);

const BasicAndWork = new mongoose.model("basicAndWork", basicAndWorkSchema);


passport.serializeUser((user, cb) => {
  // document(null,user)
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
    });
  });
});
passport.deserializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/resume",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ userId: profile.id }, async (err, user) => {
        if (user) {
          userId = profile.id;
          console.log(user + "   " + userId);
        }
        return cb(err, user);
      });
    }
  )
);

app.get("/fetchdata", async (req, res) => {
  try {
    const foundBasicAndWork = await BasicAndWork.findOne({ userId: userId });
    if (foundBasicAndWork) {
      console.log("user found" + foundBasicAndWork);
      res.send(foundBasicAndWork);
    } else {
      console.log("no user found");
    }
  } catch (err) {
    res.status(500).send("Internal error");
  }
});
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
); //tell passport to authenticate the profile by using google strategy wich we have set up above

//google will send the user to auth/google/resume route after authenticating the user by google strategy.

app.get(
  "/auth/google/resume", //this will locally authenticate the user
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // console.log("in auth/google/resume");
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/resume");
  }
);

app.post("/api/save-data", async (req, res) => {
  const formData = req.body;
  console.log("--------------------------------------------------------------");
  for (let key in formData) {
    console.log(key, formData[key]);
  }
  console.log("--------------------------------------------------------------");
  console.log("detail   " + JSON.stringify(formData["Basic Info"]));
  console.log(
    "detail------   " + JSON.stringify(formData["Basic Info"]["detail"])
  );

  const basicInfo = formData["Basic Info"];
  const workExp = formData["Work Experience"];
  const project = formData["Project"];
  const education = formData["Education"];
  const achievement = formData["Achievements"];
  const summary = formData["summary"];
  const other = formData["Others"];

  console.log("in savedata babsicInfoDetail=" + JSON.stringify(basicInfo));

  console.log("api/save-data" + userId);
  const filter = { userId: userId };
  // const update = {fName:firstName,lName:lastName};
  let update = {
    basicInfoDetail: basicInfo,
    workExpDetails: workExp,
    projectDetails: project,
    educationDetails: education,
    achievementDetails: achievement,
    summayDetails: summary,
    otherDetails: other,
  };
  await BasicAndWork.countDocuments(filter);
  let doc = await BasicAndWork.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  }).then((response) => {
    console.log(response);
  });
});


app.post("/register", async (req, res) => {
  userId = req.body.email;
  try {
    const result = await User.findOne({ userId: userId });
    if (result) {
      res.send(false);
    } else {
      bcrypt.hash(req.body.password, saltRound, function (err, hash) {
        const createdUser = User.create({
          userId: req.body.email,
          email: req.body.email,
          password: hash,
        }).then((response) => {
          console.log("cerated user"+response);
          res.send(true);
        });
      });
    }
  } catch (err) {
    console.log("error in registration" + err);
  }
});

app.post("/login", async (req, res) => {
  userId=req.body.email
  console.log(userId)
  const user = {
    userId: req.body.email,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const foundUser = await User.findOne({ userId: userId });
    if (!foundUser) {  
      res.send("notFound");
    } else {
      bcrypt.compare(user.password, foundUser.password, function (err, result) {
        if (result == true) 
        {
          res.send("successful");
        } else {  
          res.send("wrongPassword")
        }
      });
    }
  } catch (err) {
    console.log("error in login" + err);
  }
});
const port = process.env.PORT || 8080;
app.listen(port, function (req, res) {
  console.log("listening");
});
