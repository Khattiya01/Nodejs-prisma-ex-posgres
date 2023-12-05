import prisma from "../DB/db.config.js";


export const getUser = async (req, res) => {
    const findUser = await prisma.user.findMany({
        // include: {
        //     post: {
        //         include: {
        //             comment: true
        //         }
        //     },
            select: {
                _count: {
                    select: {
                        post: true,
                        comment: true
                    }
                }
            }
        // }
    })

    return res.json({ status: 200, data: findUser })
}

export const getUserByID = async (req, res) => {
    const userID = req.params.id
    const findUser = await prisma.user.findFirst({
        where: {
            id: Number(userID)
        },
        include: {
            post: {
                select: {
                    title: true,
                    comment_count: true
                }
            }
        }
    })
    if (!findUser) {
        return res.json({ status: 200, message: "User not found" })
    }

    return res.json({ status: 200, data: findUser })
}

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const findUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    if (findUser) {
        return res.json({ status: 400, message: "Email Already Taken . please another email" })
    }

    const newUser = await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: password
        }
    })

    return res.json({ status: 200, data: newUser, msg: "User created successfully" })
}

export const updateUser = async (req, res) => {
    const userID = req.params.id
    const { name, email, password } = req.body;

    await prisma.user.update({
        where: {
            id: Number(userID),
        },
        data: {
            name: name,
            email: email,
            password: password
        }
    })

    return res.json({ status: 2000, message: "User updated successfully" })
}

export const deleteUser = async (req, res) => {
    const userID = req.params.id;

    await prisma.user.delete({
        where: {
            id: Number(userID),
        }
    })

    return res.json({ status: 200, message: "delete user successfully" })

}