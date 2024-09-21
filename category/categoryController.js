const Category = require("./categoryModel");

//get all categories
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//get one category
const getOneCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) return res.status(404).send("category not found");
    res.status(200).send(category);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//create new categories
const createNewCategory = async (req, res) => {
  try {
    const newCategory = await new Category(req.body);
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//update categories
const updateCategory = async (req, res) => {
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateCategory) return res.status(404).send("Category not found!");

    res.status(200).send(updateCategory);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//delete categories
const deleteCategory = async (req, res) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deleteCategory) return res.status(404).send("Category not found!");

    res.status(200).send(deleteCategory);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllCategory,
  getOneCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
