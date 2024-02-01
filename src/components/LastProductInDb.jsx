import React from 'react';
import { Component } from 'react';

class LastProductInDb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastProduct: null,
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/lastProduct')
        .then(res => res.json())
        .then(product => {
            this.setState({lastProduct: product.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    render() {
        return (
            <React.Fragment>
                            <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto añadido</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-10" style={{width: '50rem'}} src={this.state.lastProduct?.image} alt=" Imagen del Producto " />
                    </div>
                    <h3><strong>{this.state.lastProduct?.name}</strong></h3>
                    <p>Categoría: {this.state.lastProduct?.category}</p>
                    <p>Precio: $ {this.state.lastProduct?.price}</p>
                    <p>Destacado: {this.state.lastProduct?.highlight === 1 ? 'Sí' : 'No'}</p>
                    <p>Pesentación de: {this.state.lastProduct?.package} Kg</p>
                    <p>{this.state.lastProduct?.description}</p>
                    <p></p>
                    <a className="btn btn-danger" target="" rel="nofollow" href="/products">Ver todos los productos</a>
                </div>
            </div>
        </div>
            </React.Fragment>
        )
    }
}

export default LastProductInDb;