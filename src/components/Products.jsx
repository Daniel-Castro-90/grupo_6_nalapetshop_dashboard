import React from 'react';
import { Component } from 'react';
import ProductList from './ProductList';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/products')
        .then(res => res.json())
        .then(products => {
            this.setState({productsList: products.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    render() {
        return (
            <React.Fragment>
                        {/*<!-- React Fragment es una etiqueta fantasma que en el navegador no aparece y se usa para encerrar 
                            dos <div> hermanos, se puede usar también <> </> -->*/}
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', padding: '20px', borderRadius: '8px', textAlign: 'center', margin: '0 auto' }}>
          Todos los productos en stock
        </h2>
    
                <div className='card shadow mb-4'>
                    <div className='card-body'>
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Nombre del producto:</th>
                                        <th>Categoría:</th>
                                        <th>Precio:</th>
                                        <th>Destacado:</th>
                                        <th>Presentación:</th>
                                        <th>Fecha de creación:</th>
                                        <th>Ver 👀</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.productsList.map((product, index) => {
                                            return <ProductList {...product} key={index} />
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    
            </React.Fragment>
        );

    }
}

export default Products;