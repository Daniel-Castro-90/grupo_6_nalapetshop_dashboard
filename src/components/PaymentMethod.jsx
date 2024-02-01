import React, { Component } from 'react';
import LastProduct from './LastProduct';

class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aggregatedPaymentMethods: [],
        };
    }paymentMethodCountMap

    componentDidMount() {
        fetch('http://localhost:3000/api/orders')
            .then(res => res.json())
            .then(orders => {
                if (Array.isArray(orders.data)) {
                    const paymentMethodCountMap = orders.data.reduce((acc, order) => {
                        const paymentMethod = order.paymentMethod;

                        if (!acc[paymentMethod]) {
                            acc[paymentMethod] = {
                                totalOrders: 0,
                            };
                        }

                        acc[paymentMethod].totalOrders += 1;

                        return acc;
                    }, {});

                    const aggregatedPaymentMethods = Object.keys(paymentMethodCountMap).map(paymentMethod => ({
                        paymentMethod,
                        totalOrders: paymentMethodCountMap[paymentMethod].totalOrders,
                    }));

                    const sortedAggregatedPaymentMethods = aggregatedPaymentMethods.sort((a, b) => b.totalOrders - a.totalOrders);

                    this.setState({ aggregatedPaymentMethods: sortedAggregatedPaymentMethods.slice(0, 6) });
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
                            <h5 className="m-0 font-weight-bold text-gray-800">Métodos de pago más utilizados</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {this.state.aggregatedPaymentMethods.map((method, index) => (
                                    <LastProduct
                                        productName={`${index + 1}. ${method.paymentMethod}`}
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

export default PaymentMethod;