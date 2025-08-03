import express from 'express'
import {CreateCategoryController, viewCategory, updateCategoryController, deleteCategoryController} from '../controller/categoryController.js'

const router = express.Router();

router.post('/create-category',CreateCategoryController )
router.get('/view-category',viewCategory )
router.put("/update-category/:id", updateCategoryController);
router.delete("/delete-category/:id", deleteCategoryController);


export default router;