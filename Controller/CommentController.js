import prisma from "../DB/db.config.js";

export const getComment = async (req, res) => {
    const comment = await prisma.comment.findMany({
        include: {
            post: {
                include: {
                    user: true
                }
            }
        }
    })
    return res.json({status: 200, data: comment})
}

export const getCommentByID = async (req, res) => {
    const comment_id = req.params.id
    const comment = await prisma.comment.findFirst({
        where : {
            id: Number(comment_id)
        }
    })
    return res.json({status: 200, data: comment})
}

export const createComment = async (req, res) => {
    const { user_id, post_id, comment } = req.body;

    await prisma.post.update({
        where: {
            id: Number(post_id)
        },
        data: {
            comment_count: {
                increment: 1
            }
        }
    })
    const newcomment = await prisma.comment.create({
        data: {
            user_id: Number(user_id),
            post_id: Number(post_id),
            comment: comment,
        }
    })
    return res.json({ status: 200, message: "Created successfully", data: newcomment})
}

export const updateComment = async (req, res) => {
    const { comment, comment_id} = req.body;

    await prisma.comment.update({
        where: {
            id: Number(comment_id),
        },
        data: {
            comment: comment,
        }
    })

    return res.json({ status: 200, message: 'updated successfully'})
}

export const deleteComment = async (req, res) => {
    const comment_id = req.params.id;

    await prisma.comment.delete({
        where: {
            id: comment_id,
        }
    })

    return res.json({status: 200, message: 'delete post successfully'})

}