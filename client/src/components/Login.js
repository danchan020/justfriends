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
    }).then((res) => {
       if (res.ok) {
         // console.log(res)
          res.json()
             .then((user) => 
            //  console.log(user)
             dispatch(login(user))
             )
             .then(navigate("/features"));
       } else {
          res.json().then((errorData) => setError(errorData.error));
       }
    });
 };

  return (
    <div bg='primary' style={{paddingTop: '85px'}}>
      <Center style={{paddingBottom: '15px'}}> <img src='/capstone.png' alt='logo'/> </Center>
      <Center>
      <form onSubmit={handleSubmit}>
         <FormControl onChange={handleChange}>
            <Stack spacing={3}>
               <Input variant="filled" bg="tertiary" type="text" class="form-control" id="username" placeholder="Username" width={300}/>
               <Input variant="filled" bg="tertiary" type="password" class="form-control" id="password" placeholder="Password" width={300}/>
            </Stack>
            <div style={{marginLeft: '170px', marginTop: '3px', marginBottom: '3px'}}>
               <Text>Forgot password?</Text>
            </div>
               <Button variant="solid" bg="secondary" type="submit" width={300}> Log In </Button>
         </FormControl>
      </form>
      </Center>
      <Center>
         <div style={{marginTop: '3px'}}>
            <Text>Don't have an account? {' '} <Link to="/signup">Sign Up</Link> </Text>
         </div>
      </Center>
    </div>
  )
}
