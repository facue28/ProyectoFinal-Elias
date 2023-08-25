const fetchProducts = async () => {
    const url = 'https://api-productos-dev.fl0.io/api/products'
    try{
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(err){
        console.log(err)
    }
};

export default fetchProducts