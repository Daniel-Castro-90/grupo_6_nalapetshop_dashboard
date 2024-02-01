import PropTypes from 'prop-types';

function UserList(props) {
    return (
        <tr>
            <td>{props.email}</td>
            <td>{props.dni}</td>
            <td>{props.tel}</td>
            <td>{props.roles_id === 1 ? 'Administrador' : 'Usuario'}</td>
            <td>{new Date(props.createdAt).toLocaleString()}</td>
        </tr>
    );
}

UserList.propTypes = {
    email: PropTypes.string,
    dni: PropTypes.string,
    tel: PropTypes.string,
    roles_id: PropTypes.string,
    createdAt: PropTypes.number
}

export default UserList;