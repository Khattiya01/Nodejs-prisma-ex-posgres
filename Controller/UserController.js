import prisma from "../DB/db.config.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const findUser = await prisma.user.findMany({
    // include: {
    //     post: {
    //         include: {
    //             comment: true
    //         }
    //     },
    // select: {
    //     _count: {
    //         select: {
    //             post: true,
    //             comment: true
    //         }
    //     }
    // }
    // }
  });

  return res.json({ status: 200, data: findUser });
};

export const getUserByID = async (req, res) => {
  const userID = req.params.id;

  const findUser = await prisma.user.findFirst({
    where: {
      id: Number(userID),
    },
    include: {
      post: {
        select: {
          title: true,
          comment_count: true,
        },
      },
    },
  });
  if (!findUser) {
    return res.json({ status: 200, message: "User not found" });
  }
  return res.json({ status: 200, data: findUser });
};

export const createUser = async (req, res) => {
  const { firstname, lastname, accountName, email, password } = req.body;
  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "Email Already Taken . please another email",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      email: email,
      firstname: firstname,
      lastname: lastname,
      accountName: accountName,
      password: password,
    },
  });

  return res.json({
    status: 200,
    data: newUser,
    msg: "User created successfully",
  });
};

export const updateUser = async (req, res) => {
  const { firstname, lastname, accountName, email, password, id } = req.body;

  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      email: email,
      firstname: firstname,
      lastname: lastname,
      accountName: accountName,
      password: password,
    },
  });

  return res.json({ status: 2000, message: "User updated successfully" });
};

export const deleteUser = async (req, res) => {
  const userID = req.params.id;

  await prisma.user.delete({
    where: {
      id: Number(userID),
    },
  });

  return res.json({ status: 200, message: "delete user successfully" });
};

// Login route
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // Check if the user exists
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Compare the hashed password
    const passwordMatch = password === user.password;
    // Check if the password is correct
    if (!passwordMatch) {
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const response = {
      data: user,
      token: token,
    };

    res.send(response);
  } catch (error) {
    res.status(400).send("Error during login");
  }
};
