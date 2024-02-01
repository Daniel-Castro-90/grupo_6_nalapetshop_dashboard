import PropTypes from 'prop-types';

function SmallCard(props) {
    return (
        <div className="col-md-4 mb-4">
            <div className={`card shadow h-100 py-2`} style={{ borderLeft: `4px solid ${props.color}` }}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-uppercase mb-1`} style={{ color: `${props.color}` }}>{props.title}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{props.quantity}</div>
                        </div>
                        <div className="col-auto">
                            <i className={`fas ${props.icon} fa-2x text-gray-300`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

SmallCard.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    quantity: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    icon: PropTypes.oneOf([
        'fa-film',
        'fa-award',
        'fa-user'
    ]).isRequired
};

SmallCard.defaultProps = {
    title: 'Sin título',
    color: 'c0bfbf',
    quantity: '0',
    icon: 'fa-film'
}

export default SmallCard;