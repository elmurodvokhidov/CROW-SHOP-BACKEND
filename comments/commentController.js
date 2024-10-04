const Review = require("./Review");

//get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Review.find();
    res.status(200).send(comments);
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
};

//get one comment
const getOneComment = async (req, res) => {
  try {
    const { id } = req.params;  // req.params.id to'g'ridan-to'g'ri olindi
    const comment = await Review.findById(id);
    
    if (!comment) return res.status(404).send("Comment not found!!!");
    
    res.status(200).send(comment);  // Status 201 emas, chunki 200 success status ishlatiladi
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);  // req.status o'rniga res.status() yozilishi kerak
  }
};

// bitta productga tegishli hamma reviewlarni olish
const getProductReviews = async (req, res) => {
  try {
      const { id } = req.params;
      const reviews = await Review.find({ product: id }).populate('user', 'fullname');

      res.status(200).json(reviews);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

const calculateAverageRating = async (productId) => {
  const reviews = await Review.find({ product: productId }); // productId mos bolgan hamma reviewlarni bitta massiv ichida qaytaradi
  const numOfRatings = reviews.length;

  if (numOfRatings > 0) {
      const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / numOfRatings;
      
      await Product.findByIdAndUpdate(productId, { averageRating, numOfRatings });
  }
};

//add comment
const addComment = async (req, res) => {
  try {
    const { productId } = req.params;
    const { comment, rating, user } = req.body;
    
    const newComment = new Review({
      product: productId,
      user: user,
      rating: rating,
      comment: comment,
    });

    await newComment.save();
    await calculateAverageRating(productId);

    res
      .status(201)
      .json({ data: newComment, message: "Sharh muvaffaqiyatli saqlandi" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//update comment
const updateComment = async(req , res) => {
  try {
    const updateComment = await Review.findByIdAndUpdate(req.params.id , req.body , {new : true})
    if(!updateComment) return res.status(404).send("The comment to be updated was not found!!!")
    res.status(200).send(updateComment)
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message)
  }
};

//delete comment
const deleteComment = async (req , res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }
    
    const deletedComment = await Review.findByIdAndDelete(id)
    if(!deletedComment) return res.status(404).send("The comment to be deleted was not found!!!")
    
    await calculateAverageRating(deleteComment.product);

    res.status(200).send(deleteComment)
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message)    
  }
}


module.exports = {
  getAllComments,
  getProductReviews,
  getOneComment,
  addComment,
  updateComment,
  deleteComment
};
