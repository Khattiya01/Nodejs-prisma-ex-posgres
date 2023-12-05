import prisma from "../DB/db.config.js";

export const getPost = async (req, res) => {
    const params = req.params
    const page = params.page || 1
    const limit = params.limit || 10
    console.log(" page", page)
    console.log(" limit", limit)
    console.log(" params", params)

    if(page <= 0){
        page= 1;
    }
    if(limit<= 0 || limit > 100){
        limit=10
    }
    const skip = (page -1) * limit

    const posts = await prisma.post.findMany({
        skip: skip,
        take: limit,
        include: {
            comment : {
                include: {
                    user: true
                }
            }
        },
        orderBy: {
            id: "asc"
        },
        
    })


    const totalPost = await prisma.post.count();
    const totalPages = Math.ceil(totalPost / limit);
    return res.json({status: 200, data: posts, meta: {
        totalPages,
        currentPage: page,
        limit: limit
    }})
}

export const getPostByID = async (req, res) => {
    const post_id = req.params.id
    const posts = await prisma.post.findFirst({
        where : {
            id: Number(post_id)
        }
    })
    return res.json({status: 200, data: posts})
}

export const createPost = async (req, res) => {
    const { user_id, title, description } = req.body;

    const newpost = await prisma.post.create({
        data: {
            user_id: Number(user_id),
            title: title,
            description: description,
        }
    })
    return res.json({ status: 200, message: "Created successfully", data: newpost})
}

export const updatePost = async (req, res) => {
    const { title, description, post_id} = req.body;

    await prisma.post.update({
        where: {
            id: Number(post_id),
        },
        data: {
            title: title,
            description: description,
        }
    })

    return res.json({ status: 200, message: 'updated successfully'})
}

export const deletePost = async (req, res) => {
    const post_id = req.params.id;

    await prisma.post.delete({
        where: {
            id: post_id,
        }
    })

    return res.json({status: 200, message: 'delete post successfully'})

}