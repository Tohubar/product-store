
import { create } from 'zustand'
export const useProductStore = create((set) => ({ // this is globar state hook where we need it we can just import and use
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Please fill up all boxes"}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json()
        set((state) => ({products: [...state.products, data.product]}))
        return {success: true, message: "Product Created Successfully"}
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products")
        const data = await res.json()
        set({products: data.products})
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE"
        })
      
        const data = await res.json()
        if (!data.success) {
           return {success: false, message: "Failed to delete Product"}
        }
        //Update the product card imediately...
        set(state => ({products: state.products.filter(product => product._id !== pid)}))
        return {success: true, message: data.message}
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct)
        })
        const data = await  res.json()
        if (!data.success) return {success: false, message: "Update Failed"}
        set(state => ({products: state.products.map(product => product._id === pid? data.product: product)}))
        return {success: true, message: "Updated Successfuly"}
    }
}))