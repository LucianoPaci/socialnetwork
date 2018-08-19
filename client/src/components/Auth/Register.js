import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
class Register extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
          this.props.history.push('/dashboard')
        }
      }

    // We use this to get the errors from the redux state (store)
    // and then we set it to the component state
componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        })
    }
}

onChangeHandler = (event) => { this.setState({
    [event.target.name]: event.target.value
        })
    }

onSubmit = (event) => {
    event.preventDefault()

    const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
    }
        
    this.props.registerUser(newUser, this.props.history)
}


  render() {
      const {name, password, email, password2, errors } = this.state

    return (
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit = {this.onSubmit} noValidate>
                <div className="form-group">

                <TextFieldGroup
                    type = "text"
                    error = {errors.name}
                    placeholder = "Name"
                    name = "name"
                    value = {name}
                    onChange = {this.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                <TextFieldGroup
                    type = "email"
                    error = {errors.email}
                    placeholder = "Email Address"
                    name = "email"
                    value = {email}
                    onChange = {this.onChangeHandler}
                    info = "This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />
                </div>
                <div className="form-group">
                <TextFieldGroup
                    type="password" 
                    error = {errors.password}
                    placeholder="Password" 
                    name="password" 
                    value = {password} 
                    onChange = {this.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                <TextFieldGroup
                    type="password" 
                    error = {errors.password2}
                    placeholder="Confirm Password" 
                    name="password2" 
                    value = {password2} 
                    onChange = {this.onChangeHandler}
                    />
                </div>
                <input 
                    type="submit" 
                    className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    
    )
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, { registerUser })(withRouter(Register))
