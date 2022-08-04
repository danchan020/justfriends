import React, {useState} from 'react'
import '../App.css'
import { Center, FormControl, Input, Text, Button, Stack } from '@chakra-ui/react'
import { useDispatch} from 'react-redux'
import { login } from  '../features/user'
import { Link } from 'react-router-dom'

export default function Login({navigate}) {

  const dispatch = useDispatch()
  const initialSignInData = {
    username: "",
    password: "",
 };

 const [signInData, setSignInData] = useState(initialSignInData);
 const [error, setError] = useState([]);

 const handleChange = (e) => {
    const { id, value } = e.target;
    setSignInData({ ...signInData, [id]: value });
 };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
       method: "POST",
       headers: {
          "Content-Type": "application/json",
       },
       body: JSON.stringify(signInData),
    }).then((r) => {
       if (r.ok) {
          r.json()
             .then((user) => 
             dispatch(login(user))
             )
             .then(navigate("/features"));
       } else {
          r.json().then((errorData) => setError(errorData.error));
       }
    });
 };

  return (
    <div bg='primary'>
      <Center> <img src='/capstone.png' alt='logo'/> </Center>
      <Center>
      <form onSubmit={handleSubmit}>
         <FormControl onChange={handleChange}>
            <Stack spacing={3}>
               <Input variant="filled" bg="tertiary" type="text" class="form-control" id="username" placeholder="Username" width={300}/>
               <Input variant="filled" bg="tertiary" type="password" class="form-control" id="password" placeholder="Password" width={300}/>
            </Stack>
               <Text>Forgot password?</Text>
               <Button variant="solid" bg="secondary" type="submit" width={300}> Log In </Button>
         </FormControl>
      </form>
      </Center>
      <Center>
         <Text>Don't have an account? {' '} <Link to="/signup">Sign Up</Link> </Text>
      </Center>
    </div>
    
  )
}
