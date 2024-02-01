import { Component } from "react";
import AddProduct from "./AddProduct";
import AddUser from "./AddUser";

class AdminPanel extends Component {
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

            <div id="wrapper">                
            <div id="content">
              <AddProduct/>
              <div id="content-wrapper" className="d-flex flex-column">
              <AddUser/>
              </div>
            </div>
          </div>
        )
    }
}

export default AdminPanel;