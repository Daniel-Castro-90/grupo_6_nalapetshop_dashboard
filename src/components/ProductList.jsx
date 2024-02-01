import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProductList(props) {
    const productDetailLink = `http://localhost:3000/products/productDetail/${props.id}`;

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.category}</td>
            <td>$ {props.price}</td>
            <td>{props.highlight === 0 ? 'No' : 'Sí'}</td>
            <td>{props.package} Kgs</td>
            <td>{new Date(props.createdAt).toLocaleString()}</td>
            <td>
                <Link to={productDetailLink} target="_blank">Ver Detalle</Link>
            </td>
        </tr>
    );
}

ProductList.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.string,
    highlight: PropTypes.string,
    package: PropTypes.string,
    createdAt: PropTypes.number
}

export default ProductList;
