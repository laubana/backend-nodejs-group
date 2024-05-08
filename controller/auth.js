const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../model/User");

const signUp = async (req, res) => {
  try {
    const {
      email,
      password,
      imageUrl,
      name,
      address,
      latitude,
      longitude,
      description,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const user = await User.findOne({ email }).lean().exec();

    if (user) {
      return res.status(400).json({
        message:
          "The email address already exists, try with a different email address.",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      imageUrl,
      name,
      address,
      latitude,
      longitude,
      description,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ message: "Email does not exists." });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Password is incorrect." });

    const accessToken = jsonwebtoken.sign(
      {
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jsonwebtoken.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refresh = (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.refreshToken)
      return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    jsonwebtoken.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, result) => {
        if (error) return res.status(403).json({ message: "Forbidden" });

        const user = await User.findOne({
          email: result.email,
        }).exec();

        if (!user) return res.status(401).json({ message: "Unauthorized" });

        const accessToken = jsonwebtoken.sign(
          {
            email: user.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        res.json({
          accessToken,
          email: user.email,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  refresh,
};
