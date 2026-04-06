import { useState } from "react"
import { useNavigate } from "react-router"
import {
    useCreateProductMutation,
    useUploadProductImageMutation
} from '../../redux/api/productApiSlice.js'
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu.jsx"


const ProductList = () => {
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [imageUrl, setImageUrl] = useState(null)
    const navigate = useNavigate()

    const [uploadProductImage] = useUploadProductImageMutation()
    const [createProduct] = useCreateProductMutation()
    const { data: categories } = useFetchCategoriesQuery()

    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append('image', image)
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('quantity', quantity)
            productData.append('brand', brand)
            productData.append('countInStock', countInStock)

            const { data } = await createProduct(productData)
            if (data.error) {
                toast.error('Product create failed Try again')

            } else {
                toast.success(`${data.name} is created`);
                navigate("/");
            }

        } catch (error) {
            console.error(error)
            toast.error("Product create failed Try Again")
        }
    }

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex_col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="h-12 font-bold">Create Product</div>

                    {imageUrl && (
                        <div className="text-center">
                            <img src={imageUrl}
                                alt="product"
                                className="block mx-auto max-h-[200px]" />
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="border px-4 block w-full text-center
        rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload Image"}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className={!image ? "hidden" : "text-white "}
                            />
                        </label>
                    </div>
                    <div className="p-3">
                        <div className="flex flex-wrap gap-10">
                            <div className="one w-2/5">
                                <label htmlFor="name">Name</label><br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-full border rounded-lg bg-white"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="two w-2/5">
                                <label htmlFor="name block">Price</label><br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-full border rounded-lg bg-white"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-10">
                            <div className="one w-2/5">
                                <label htmlFor="name block">Quantity</label><br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-full border rounded-lg bg-white"
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="two w-2/5">
                                <label htmlFor="name block">Brand</label><br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-full border rounded-lg bg-white"
                                    value={brand}
                                    onChange={e => setBrand(e.target.value)}
                                />
                            </div>
                        </div>
                        <label htmlFor="description" className="block mb-2">Description</label>
                        <textarea
                            id="description"
                            className="p-2 mb-3 bg-white border rounded-lg w-[95%]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="name block">Count In countInStock</label><br />
                                <input type="text" className="p-4 mb-3 w-[30rem] rounded-lg bg-white" value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)} />
                            </div>
                            <div className="ml-4">
                                <label htmlFor="">Category</label><br />
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="p-4 mb-3 w-[30rem] rounded-lg bg-white"
                                >
                                    <option value="">Choose Category</option>
                                    {categories?.map((c) => (
                                        <option value={c._id} key={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="py-4 px-10 mt-5 rounded-lg text-lg
                         font-bold bg-pink-600"> Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList