import React, { Component } from 'react';
import LastProduct from './LastProduct';

class ShippingMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aggregatedShippingMethods: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/orders')
            .then(res => res.json())
            .then(orders => {
                if (Array.isArray(orders.data)) {
                    const shippingMethodCountMap = orders.data.reduce((acc, order) => {
                        const shippingMethod = order.shippingMethod;

                        if (!acc[shippingMethod]) {
                            acc[shippingMethod] = {
                                totalOrders: 0,
                            };
                        }

                        acc[shippingMethod].totalOrders += 1;

                        return acc;
                    }, {});

                    const aggregatedShippingMethods = Object.keys(shippingMethodCountMap).map(shippingMethod => ({
                        shippingMethod,
                        totalOrders: shippingMethodCountMap[shippingMethod].totalOrders,
                    }));

                    const sortedAggregatedShippingMethods = aggregatedShippingMethods.sort((a, b) => b.totalOrders - a.totalOrders);

                    this.setState({ aggregatedShippingMethods: sortedAggregatedShippingMethods.slice(0, 6) });
                } else {
                    console.error('La propiedad data en la respuesta de la API no es un array:', orders);
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
                            <h5 className="m-0 font-weight-bold text-gray-800">Métodos de envío más utilizados</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {this.state.aggregatedShippingMethods.map((method, index) => (
                                    <LastProduct
                                        productName={`${index + 1}. ${method.shippingMethod}`}
                                        quantity={method.totalOrders}
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

export default ShippingMethod;