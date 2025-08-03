import express from 'express';
import slugify from 'slugify';
import category from '../models/categorymodel.js';

export const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation
    if (!name) {
      return res.status(401).send({
        message: "Name is required"
      });
    }

    // Check existing
    const existingCategory = await category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists"
      });
    }

    // Create category
    const newCategory = await new category({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New Category Created",
      category: newCategory,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating category"
    });
  }
};


export const viewCategory = async (req, res) => {
  try {
    const categories = await category.find({}); // get all categories

    res.status(200).send({
      success: true,
      message: "All Categories Fetched Successfully",
      categories,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Server Error in View Category",
    });
  }
};


 export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }

    const updatedCategory = await category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};


export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      category: deletedCategory,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting category",
    });
  }
};