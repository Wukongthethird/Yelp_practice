const db = require("../../DB");

const editComment = async (req,res,next)=>{
  const userId = req.session.passport.user.id;
  const commentId =  req.body["commentId"]
  const message = req.body["commentMessage"]
  

  try{
  const comment = await db.query(`
  SELECT comment_id as "commentId", comment_message as "commentMessage",
    created_at as "createdAt", updated_at as "updatedAt",
    user_id as "userId", restaurant_id as "restaurantId",
    parent_id as "parentId" 
    FROM comments where comment_id = $1
  `, [commentId]).then( c => c.rows[0])

  console.log("comment" , comment)
  if (!comment){
    return res.json({err:"what are you doing?"})
  }
  

  if(comment.userId !== userId){
    return res.json({err:"that aint your comment boy"})
  }


  const result = await db.query(`
  UPDATE comments SET 
  comment_message =$1 WHERE comment_id = $2
  `,
  [message,commentId])

return res.json({})
  }catch(err){
    next(err)
  }

}

module.exports =  editComment;