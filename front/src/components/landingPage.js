import React from "react";
import { connect } from "react-redux";
import { logIn, addUser } from "../actions/addUsers";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logModal: false,
      signModal: false,
      dropdownOpen: false,
      username: '',
      firstname: '',
      lastname: '',
      password:'',
      confirmPassword:''
    };

    this.signToggle = this.signToggle.bind(this);
    this.logToggle = this.logToggle.bind(this);
    //this.signModal = this.signModal.bind(this);
    //this.logModal = this.logModal.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleLogin= this.handleLogin.bind(this);


  }

  signToggle() {
    this.setState(prevState =>({
      signModal: !prevState.signModal
    }));
  }
  logToggle() {
    this.setState(prevState => ({
      logModal: !prevState.logModal
    }));
  }
handleChange = (e) =>{
this.setState({[e.target.name]: e.target.value});
};

handleSubmit =(e) =>{
    e.preventDefault();
    if(this.state.confirmPassword !== this.state.password){
        return "password do not match";
    }
    if((this.state.username < 6) || (this.state.username > 30)){
        return "Username should be 6-30 characters long Please try again!"
    }
    if((this.state.password < 8 )||(this.state.password > 30)){
        return "password should be between 8-30 characters long Please try again!"
    }

    this.props.addUser(
        {
            username: this.state.username.trim(),
            firstname: this.state.firstname.trim(),
            lastname: this.state.lastname.trim(),
            password:this.state.password.trim(),
            //email: this.state.email.trim()

    },
    this.props.history
    );
    this.setState({
        username: "",
        firstname: "",
        lastname: "",
        password:"",
        confirmPassword:"",
        logModal: false,
        signModal: false,
        dropdownOpen: false



    });

};

handleLogin = (e) =>{
    e.preventDefault();
    if(this.state.password.length < 8){
        return "password should be atleast 8 characters long Try again Please!"
    }
    this.props.logIn(
        {
            username: this.state.username.trim(),
            password: this.state.password.trim()
        },
        this.props.history
    );
    this.setState({
        username: "",
        password: ""
    });

    
};

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.signToggle}>
          Sign Up
        </Button>
        <Modal
          isOpen={this.state.signModal}
          toggle={this.signToggle}
          
        >
        
          <ModalBody>
          <label>Username: </label>
            <input
              className="klass"
              type="email"
              name="username"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <br />
            <label>Firstname: </label>
            <input
              className="klass"
              type="text"
              name="firstname"
              placeholder="Enter your firstname!"
              value={this.state.firstname}
              onChange={this.handleChange}
            />
            <br />
            <label>Lastname: </label>
            <input
              className="klass"
              type="text"
              name="lastname"
              placeholder="Enter your lastname!"
              value={this.state.lastname}
              onChange={this.handleChange}
            />
            <br />
            <label>Password: </label>
            <input
              className="klass"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br />
            <label>ConfirmPassword: </label>
            <input
              className="klass"
              type="password"
              name="confirmPassword"
              placeholder="Enter your confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.signToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Button color="danger" onClick={this.logToggle}>
          Login
        </Button>
        <Modal
          isOpen={this.state.logModal}
          toggle={this.logMoggle}
          className={this.props.className}
        >
          <ModalBody>
          <label>Username: </label>
            <input
              className="klass"
              type="username"
              name="username"
              placeholder="Enter your username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <br />
            <label>Password: </label>
            <input
              className="klass"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleLogin}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.logToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { logIn, addUser }
)(withRouter(LandingPage));
