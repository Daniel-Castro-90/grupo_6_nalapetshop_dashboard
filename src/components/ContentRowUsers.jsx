import SmallCard from "./SmallCard";
import { Component } from "react";

class ContentRowUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/users')
        .then(res => res.json())
        .then(users => {
            this.setState({users: users.data});
        })
        .catch(err => {
            console.log(err)
        })

    }

    render() {
        const totalCount = this.state.users ? this.state.users.length : 0;
        const adminCount = this.state.users ? this.state.users.filter(user => user.roles_id === 1).length : 0;
        const userCount = this.state.users ? this.state.users.filter(user => user.roles_id === 2).length : 0;

        return (
            <div className="row">
                {/* <!-- Movies in Data Base --> */}
                <SmallCard title="Cantidad de Usuarios" color="#afdeaa" quantity={userCount}/>
    
                {/* <!-- Total awards --> */}
                <SmallCard title="Cantidad de Administradores" color="#afdeaa" quantity={adminCount} icon="fa-award" />
    
                {/* <!-- Actors quantity --> */}
                <SmallCard title="Total registrados" color="#afdeaa" quantity={totalCount} icon="fa-user" />
            </div>
        );
    }
}

export default ContentRowUsers;
