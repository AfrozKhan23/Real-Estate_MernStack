import admin from "../models/admin.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "process.env.JWT_SECRET";

const getAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await admin.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const createUser = await admin.create({ name, email, password: hash });

    console.log("Admin created successfully");
    res.send(createUser);
  } catch (error) {
    console.error("Error while creating Admin:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const updateUser = await admin.findByIdAndUpdate(
      id,
      { password: hash },
      {
        new: true,
      }
    );

    if (!updateUser) {
      return res.status(404).send({ error: "Admin not found" });
    }

    console.log("Admin updated successfully");
    res.send(updateUser);
  } catch (error) {
    console.error("Error while updating Admin:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { getAdmin, createAdmin, updateAdmin };
