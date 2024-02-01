import SmallCard from "./SmallCard";
import { Component } from "react";

class ContentRowProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: [],
            titleMouseOver: false
        };
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

        const totalCount = this.state.productsList ? this.state.productsList.length : 0;
        const highlightCount = this.state.productsList ? this.state.productsList.filter(product => product.highlight === true).length : 0;

        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const monthCount = this.state.productsList ? this.state.productsList.filter(product => {
        const productDate = new Date(product.createdAt);
        return productDate >= startOfMonth && productDate <= endOfMonth;}).length : 0;

        return (
            <div className="row">
    
            {/* <!-- Movies in Data Base --> */}
            <SmallCard title="Productos registrados este mes" color="#8ea5d1" quantity={monthCount} icon="fa-film" />
    
            {/* <!-- Total awards --> */}
            <SmallCard title="Productos destacados este mes" color="#8ea5d1" quantity={highlightCount} icon="fa-award" />
    
            {/* <!-- Actors quantity --> */}
            <SmallCard title="Total de productos a la venta" color="#8ea5d1" quantity={totalCount} icon="fa-product" />
        </div>
        );
    }
}

export default ContentRowProducts;