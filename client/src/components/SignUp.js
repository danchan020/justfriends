import React, {useState} from 'react'
import { Center, FormControl, Input, Text, Button, HStack, Stack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from  '../features/user'
import { Link } from 'react-router-dom'

export default function SignUp({navigate}) {

  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  const newUser = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    avatar: "",
    bio: "",
 };

 const [signUpData, setSignUpData] = useState(newUser);
 console.log(signUpData)
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
             .then(navigate("/home")) 
       } else {
          r.json().then((errorData) => setError(errorData.error));
       }
    });
 };

  return (
    <div>
      <Center> <img src='/capstone.png' alt='logo'/> </Center>
      <Center>
        <form onSubmit={handleSubmit}>
          <FormControl onChange={handleChange}>
            <Stack spacing={3}>
              <HStack spacing={10}>
                <Input variant="filled" bg="tertiary" type="text" class="form-control" id="first_name" placeholder="First Name" width={130}/>
                <Input variant="filled" bg="tertiary" type="text" class="form-control" id="last_name" placeholder="Last Name" width={130}/>
              </HStack>
              <Input variant="filled" bg="tertiary" type="email" class="form-control" id="email" placeholder="Email" width={300}/>
              <Input variant="filled" bg="tertiary" type="text" class="form-control" id="username" placeholder="Username" width={300}/>
              <Input variant="filled" bg="tertiary" type="password" class="form-control" id="password" placeholder="Password" width={300}/>
              <Input variant="filled" bg="tertiary" type="password" class="form-control" id="password_confirmation" placeholder="Password Confirmation" width={300}/>
            </Stack>
              <Button  variant="solid" bg="secondary" type="submit" width={300} marginTop="15px"> Sign Up  </Button>
          </FormControl>
        </form> 
      </Center>
      <Center>
        <Text>Already have an account? {' '} <Link to="/" >Log In </Link> </Text>
      </Center>
    </div>
  )
}
