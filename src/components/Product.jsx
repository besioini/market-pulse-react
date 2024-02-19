import '../styles/product.css';

const  Product = ({ product, onClick }) => {
  return (
    <div className='product-card' onClick={() => onClick(product._id)}>
        <h3>{product.name}</h3>
        <img src={product.imageUrl} alt={product.name} />
        <p id='price'>${product.price}</p>
    </div>
  )
}

export default Product;