import React from 'react';
import UserList from './UserList';
import { Component } from 'react';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/users')
        .then(res => res.json())
        .then(users => {
            this.setState({usersList: users.data});
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
          Todos los usuarios registrados
        </h2>
    
                <div className='card shadow mb-4'>
                    <div className='card-body'>
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>DNI</th>
                                        <th>Teléfono</th>
                                        <th>Tipo de Usuario</th>
                                        <th>Última Orden solicitada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.usersList.map((user, index) => {
                                            return <UserList {...user} key={index} />
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

export default Users;