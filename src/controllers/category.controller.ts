import { Request, Response } from "express";
import Category from "../models/category.model";

export class CategoryController {
  constructor() {}

  // Create a new category
  public create = async (req: Request, res: Response): Promise<any> => {
    try {
      const { name, color } = req.body;
      const exist = await Category.findOne({ name });
      if (exist) {
        return res.status(400).json({ message: "Entity Already Exists with provided constraints" });
      }

      const cat = new Category({ name, color });
      const result = await cat.save();
      res.status(201).json({ message: "Category creation successful", result });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  };

  // Get all categories
  public get = async (req: Request, res: Response): Promise<any> => {
    try {
      const categories = await Category.find();
      res.status(200).json({ message: "Categories fetched successfully", categories });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  };

  // Get a category by ID
  public getById = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category fetched successfully", category });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  };

  // Update a category by ID
  public update = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const { name, color } = req.body;

      // Check if the category exists
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Update the category fields
      category.name = name || category.name;
      category.color = color || category.color;

      const updatedCategory = await category.save();
      res.status(200).json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  };

  // Delete a category by ID
  public delete = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  };
}
