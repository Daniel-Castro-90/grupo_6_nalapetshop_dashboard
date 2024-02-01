import { Component } from 'react';
import ProductList from './ProductList';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetail: null,
            allProducts: []
        };
    }

    componentDidMount() {

        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then(products => {
                this.setState({ allProducts: products.data });
                

                const productId = <ProductList {product.id} />


                const productDetail = products.data.find(product => product.id.toString() === productId);

                this.setState({ productDetail });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const { productDetail } = this.state;

        if (!productDetail) {
            return <p>Cargando...</p>;
        }

        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Detalle del Producto</h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-10" style={{ width: '50rem' }} src={productDetail?.image} alt=" Imagen del Producto " />
                        </div>
                        <h3><strong>{productDetail?.name}</strong></h3>
                        <p>Categoría: {productDetail?.category}</p>
                        <p>Precio: $ {productDetail?.price}</p>
                        <p>Destacado: {productDetail?.highlight === 1 ? 'Sí' : 'No'}</p>
                        <p>Presentación de: {productDetail?.package} Kg</p>
                        <p>{productDetail?.description}</p>
                        <p></p>
                        <a className="btn btn-danger" style={{ marginTop: '10px' }} target="" rel="nofollow" href="/products">Ver todos los productos</a>
                        <br></br>
                        <a className="btn btn-danger" style={{ marginTop: '10px' }} target="" rel="nofollow" href={`/products/edit/${productDetail?.id}`}>Editar este producto</a>
                        <br></br>
                        <a className="btn btn-danger" style={{ marginTop: '10px' }} target="" rel="nofollow" href={`/products/delete/${productDetail?.id}`}>Eliminar este producto</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;