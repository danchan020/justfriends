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
 const [errors, setErrors] = useState([]);

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
    }).then((res) => {
       if (res.ok) {
          res.json()
             .then((user) => dispatch(login(user)))
             .then(navigate("/features")) 
       } else {
          res.json().then((errorData) => setErrors(errorData.errors));
       }
    });
 };

  return (
    <div style={{paddingTop: '65px'}}>
      <Center style={{paddingBottom: '15px'}}> <img src='/capstone.png' alt='logo'/> </Center>
      <Center>
        <form onSubmit={handleSubmit}>
          <FormControl onChange={handleChange}>
            <Stack spacing={3}>
              <HStack spacing={5}>
                <Input variant="filled" bg="tertiary" type="text" class="form-control" id="first_name" placeholder="First Name" width={140}/>
                <Input variant="filled" bg="tertiary" type="text" class="form-control" id="last_name" placeholder="Last Name" width={140}/>
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
      {errors.length > 0 && (
                           <div
                              style={{
                                 color: "red",
                                 listStyleType: "none",
                                 textAlign: "center",
                              }}
                           >
                              {errors.map((error) => (
                                 <p key={error}>{error}</p>
                              ))}
                           </div>
                        )}
      <Center>
        <div style={{marginTop: '3px'}}>
          <Text>Already have an account? {' '} <Link to="/" >Log In </Link> </Text>
        </div>
      </Center>
    </div>
  )
}
