import React, { Component } from 'react';
import LastProduct from './LastProduct';

class FrequentProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aggregatedProducts: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/orderitems')
            .then(res => res.json())
            .then(orderitems => {
                if (Array.isArray(orderitems.data)) {
                    const productCountMap = orderitems.data.reduce((acc, orderitem) => {
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

                    this.setState({ aggregatedProducts: sortedAggregatedProducts.slice(0, 6) });
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
                            <h5 className="m-0 font-weight-bold text-gray-800">Productos más solicitados</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {this.state.aggregatedProducts.map((product, index) => (
                                    <LastProduct
                                        productName={`${index + 1}. ${product.productName}`}
                                        quantity={product.totalQuantity}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default FrequentProduct;