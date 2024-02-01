import PropTypes from 'prop-types';

function LastProduct(props) {
    
    return (
        <div className="col-lg-6 mb-4">
            <div className={`card bg-dark text-white shadow ${props.styleClassName}`} >
                <div className="card-body">
                    {props.productName}
                </div>
            </div>
        </div>
    )
}

LastProduct.propTypes = {
    productName: PropTypes.string.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    isTitleMouseOver: PropTypes.bool.isRequired,
    styleClassName: PropTypes.string,
};

export default LastProduct;