import asyncHandler from "../middlewares/asyncHandler.js";
import Product from '../models/productModel.js';

const addProduct = asyncHandler(async(req,res)=>{
    try {
        const {name,description,price,category,quantity,brand} = req.fields
       switch (true) {
        case !name:
            return res.status(400).json({message:"Name is required"});
        case !description:
            return res.status(400).json({message:"Description is required"});   
        case !price:
            return res.status(400).json({message:"Price is required"});
        case !category:
            return res.status(400).json({message:"Category is required"});
        case !quantity:
            return res.status(400).json({message:"Quantity is required"});
        case !brand:
            return res.status(400).json({message:"Brand is required"});
       
       }
         const product = new Product({...req.fields});
         await product.save()
         res.json(product)
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
});


 const updateProductDetails = asyncHandler(async(req,res)=>{
    try {
        const {name,description,price,category,quantity,brand} = req.fields
       switch (true) {
        case !name:
            return res.status(400).json({message:"Name is required"});
        case !description:
            return res.status(400).json({message:"Description is required"});   
        case !price:
            return res.status(400).json({message:"Price is required"});
        case !category:
            return res.status(400).json({message:"Category is required"});
        case !quantity:
            return res.status(400).json({message:"Quantity is required"});
        case !brand:
            return res.status(400).json({message:"Brand is required"});
       
       }
         const product = await Product.findByIdAndUpdate(req.params.id,{...req.fields},{new:true})
         await product.save()
         res.json(product)
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
});

const removeProduct = asyncHandler(async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
       
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Server Error"})
    }
});

const fetchProducts = asyncHandler(async(req,res)=>{
    try {
        const pageSize = 6
        const keyword =req.query.keyword?{name:{$regex:req.query.keyword,
            $options:"i"}} : {};
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize)
    res.json({products,page:1,pages:Math.ceil(count/pageSize)});
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Server Error" })
    }
});

const fetchProductById = asyncHandler(async(req,res)=>{
    try {
       const product = await Product.findById(req.params.id)
       if (product) {
         return res.json(product);
       }else{
        res.status(404);
        throw new Error("product not found")
       }
    } catch (error) {
        console.error(error)
        res.status(404).json({error:"Product Not found" })
    }
});
 
const fetchAllProducts =  asyncHandler(async(req,res)=>{
    try {
       const products = await Product.find({}).populate('category').limit(12).sort
       ({createdAt:-1})

       res.json(products)
       
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Server Error" })
    }
});

const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ error: "Product already reviewed" });
    }

    // Build review object
    const review = {
      name: req.user.username, // ✅ matches your schema
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // Push review into product
    product.reviews.push(review);

    // Update counts and average rating
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added", reviews: product.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};


 const fetchTopProducts = asyncHandler(async(req,res)=>{
    try {
       const products = await Product.find({}).sort({rating:-1}).limit(4)

       res.json(products);
       
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
});

 const fetchNewProducts= asyncHandler(async(req,res)=>{
    try {
       const products = await Product.find().sort({_id:-1}).limit(5)

       res.json(products);
       
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
});

const filterProducts = asyncHandler(async(req,res)=>{
    try {
        const {checked,radio} = req.body
        let args = {}
        if (checked.length>0) args.category = checked
        if (radio.length) args.price= {$gte:radio[0],$lte:[1]}

        const products = await Product.find(args)
        res.json(products);
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'server error'})
    }
})

export {addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
fetchAllProducts,
addProductReview,
fetchTopProducts,
filterProducts,
fetchNewProducts}