const express = require("express")
const router = express.Router();
const { Category } = require("../Model/category")
const { handler } = require("../handlers/exeptionalHandling")

//get
async function getCategory(req, res) {
    const categoryList = await Category.find()
    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(categoryList)
}

async function getByCategoryById(req, res) {
    let category = await Category.findById(req.params.id)
    if (!category) {
        res.status(500).json({ success: false })
            .json({ msg: "The category with the given ID was not found" })
    }
    res.status(200).send(category)
}

//POST
async function postcategory(req, res) {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });
    category = await category.save()
    if (!category)
        return res.status(400).send("this category cannot be created!")
    res.send(category)
}

//Update
async function updateCategory(req, res) {
    let category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color,
        },
        { new: true }
    );
    if (!category) return res.status(400).send("the category cannot be created..");
    res.send(category);
}

//DELETE
async function deleteCategory(req, res) {
    Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
                return res
                    .status(200)
                    .json({ success: true, message: "The category is deleted" })
            }
            else {
                return res
                    .status(404)
                    .json({ success: false, message: "category not found" })
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err })
        });
}

router.get("/", handler(getCategory))
router.get("/:id", handler(getByCategoryById))
router.get("/", handler(postcategory))
router.put("/:id", handler(updateCategory))
router.delete("/:id", handler(deleteCategory))

module.exports = router;
