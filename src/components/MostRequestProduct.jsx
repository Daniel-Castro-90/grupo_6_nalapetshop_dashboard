import React, { Component } from 'react';

class MostRequestProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostRequestedProduct: null,
            productDetails: null,
        };
    }

    componentDidMount() {
        const currentDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);

        // Fetch para obtener los datos de los productos más solicitados en el último mes
        fetch('http://localhost:3000/api/orderitems')
            .then(res => res.json())
            .then(orderitems => {
                if (Array.isArray(orderitems.data)) {
                    const filteredOrderitems = orderitems.data.filter(orderitem => {
                        const orderDate = new Date(orderitem.createdAt);
                        return orderDate >= oneMonthAgo;
                    });

                    const productCountMap = filteredOrderitems.reduce((acc, orderitem) => {
                        const productId = orderitem.product_id;
                        const quantity = orderitem.quantity;

                        if (!acc[productId]) {
                            acc[productId] = {
                                productName: orderitem.name,
                                totalQuantity: 0,
                            };
                        }

                        acc[productId].totalQuantity += quantity;

                        return acc;
                    }, {});

                    const aggregatedProducts = Object.keys(productCountMap).map(productId => ({
                        productId,
                        productName: productCountMap[productId].productName,
                        totalQuantity: productCountMap[productId].totalQuantity,
                    }));

                    const sortedAggregatedProducts = aggregatedProducts.sort((a, b) => b.totalQuantity - a.totalQuantity);

                    const mostRequestedProduct = sortedAggregatedProducts[0];

                    this.setState({ mostRequestedProduct });

                    // Fetch para obtener los detalles del producto más solicitado
                    fetch(`http://localhost:3000/api/products/${mostRequestedProduct.productId}`)
                        .then(res => res.json())
                        .then(productDetails => {
                            this.setState({ productDetails });
                        })
                        .catch(err => {
                            console.error('Error al obtener los detalles del producto:', err);
                        });
                } else {
                    console.error('La propiedad data en la respuesta de la API no es un array:', orderitems);
                    throw new Error('Error en la respuesta de la API');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h5 className="m-0 font-weight-bold text-gray-800">Producto más solicitado en este mes</h5>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <img className="img-fluid px-3 px-sm-4 mt-3 mb-10" style={{ width: '50rem' }} src={this.state.productDetails?.image} alt=" Imagen del Producto " />
                            </div>
                            <h3><strong>{this.state.productDetails?.name}</strong></h3>
                            <p>Categoría: {this.state.productDetails?.category}</p>
                            <p>Precio: $ {this.state.productDetails?.price}</p>
                            <p>Destacado: {this.state.productDetails?.highlight === 1 ? 'Sí' : 'No'}</p>
                            <p>Pesentación de: {this.state.productDetails?.package} Kg</p>
                            <p>{this.state.productDetails?.description}</p>
                            <p></p>
                            <a className="btn btn-danger" target="" rel="nofollow" href="/products">Ver todos los productos</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MostRequestProduct;