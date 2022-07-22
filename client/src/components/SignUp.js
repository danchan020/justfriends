import React, {useState} from 'react'
import { FormControl, Input, Text, Button, Stack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from  '../features/user'
import { Link } from 'react-router-dom'

export default function SignUp({navigate}) {

  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  console.log(user)

  const newUser = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    avatar: ""
 };

 const [signUpData, setSignUpData] = useState(newUser);
 const [error, setError] = useState([]);

 const handleChange = (e) => {
    const { id, value } = e.target;
    setSignUpData({ ...signUpData, [id]: value });
 };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/signup", {
       method: "POST",
       headers: {
          "Content-Type": "application/json",
       },
       body: JSON.stringify(signUpData),
    }).then((r) => {
       if (r.ok) {
          r.json()
             .then((user) => dispatch(login(user)))
             .then(console.log(user))
              // navigate("/home")
       } else {
          r.json().then((errorData) => setError(errorData.error));
       }
    });
 };

  return (
    <div>
      <img src='/capstone.png' alt='logo'/>
      <form onSubmit={handleSubmit}>
        <FormControl onChange={handleChange}>
          <Stack spacing={3}>
            <Input variant="filled" bg="tertiary" type="text" value={signUpData.first_name} class="form-control" id="first_name" placeholder="First Name" width={130}/>
            <Input variant="filled" bg="tertiary" type="text" value={signUpData.last_name} class="form-control" id="last_name" placeholder="Last Name" width={130}/>
            <Input variant="filled" bg="tertiary" type="email" value={signUpData.email} class="form-control" id="email" placeholder="Email" width={300}/>
            <Input variant="filled" bg="tertiary" type="text" value={signUpData.username} class="form-control" id="username" placeholder="Usename" width={300}/>
            <Input variant="filled" bg="tertiary" type="password" value={signUpData.password} class="form-control" id="password" placeholder="Password" width={300}/>
            <Input variant="filled" bg="tertiary" type="password" value={signUpData.password_confirmation} class="form-control" id="password_confirmation" placeholder="Password Confirmation" width={300}/>
          </Stack>
            <Button  variant="solid" bg="secondary" type="submit" width={300} marginTop="15px"> Sign Up  </Button>
        </FormControl>
      </form>
      <Text>Already have an account?</Text>
      <Link to="/" >Log In </Link>
    </div>
  )
}
