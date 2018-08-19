import React, { Component } from 'react'

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
    console.log(newUser)
}


  render() {
      const {name, password, email, password2 } = this.state
    return (
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit = {this.onSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    placeholder="Name" 
                    name="name"
                    value = {name} 
                    onChange = {this.onChangeHandler}
                    required 
                    />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    placeholder="Email Address" 
                    name="email"
                    value = {email}
                    onChange = {this.onChangeHandler}  
                    />
                  <small 
                    className="form-text text-muted">
                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                </small>
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    placeholder="Password" 
                    name="password" 
                    value = {password} 
                    onChange = {this.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                  <input type="password" 
                    className="form-control form-control-lg" 
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

export default Register