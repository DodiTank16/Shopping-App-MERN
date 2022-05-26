import axios from "axios";
import React, {useState} from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

const initialValues = {
  email : "",
  password : ""
}

function Login() {
  const [state, setState] = useState(initialValues)

  const handleChange = (e) =>{
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const userData = {
      email : state.email,
      password : state.password
    }
    axios.post("https://reqres.in/api/login",userData)
    .then(res => {
      console.log(res.status);
      console.log(res.data.token);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  return (
    <>
      <Form>
        <Form.Field>
          <h1>Login</h1>
          <label>E-Mail</label>
          <input 
            style={{ width: "30%" }} 
            placeholder="email" 
            name="email"
            type={"email"}
            value={state.email}
            onChange={handleChange}
            required
            />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input 
            style={{ width: "30%" }} 
            placeholder="password" 
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            required 
            />
        </Form.Field>
        {/* <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field> */}
        <Button primary type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Login;
