import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

try {
  await mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB connected");
} catch (error) {
  console.error("Error connecting to database:", error);
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

//Routes
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with the provided email
    const user = await User.findOne({ email: email });

    if (user) {
      // Check if the provided password matches the user's password
      if (password === user.password) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.send({ message: "User already registered" });
    } else {
      // Create a new user
      const newUser = new User({
        name,
        email,
        password,
      });

      // Save the new user to the database
      await newUser.save();

      res.send({ message: "Successfully Registered, Please login now." });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// app.post("/register",(req,res)=>{
//     console.log(req.body)
// })

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
