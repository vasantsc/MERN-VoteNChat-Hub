import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack,
    useToast} from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState();
    const [password,setpassword] = useState();
    const [show,setShow] = useState();
    const [loading,setLoading] = useState();

  const toast = useToast();
const navigate = useNavigate();
    const sumbitHandler =async ()=>{
        setLoading(true);
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
    
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
          );
    
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        //   setUser(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          navigate("/chats");
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }

    };
  return (
    <VStack spacing="5px">
    <FormControl id="email" isRequired>
      <FormLabel>Email</FormLabel>
      <Input value={email} placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
    </FormControl>
    <FormControl id="password" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
      <Input value={password} type={show?"text":"password"} placeholder='Enter Your Password' onChange={(e)=>setpassword(e.target.value)}/>
      <InputRightElement width="4.5rem">
      <Button h="1.75rem" size="sm" onClick={()=>{setShow(!show)}}>{show ? "Hide":"Show"}</Button>
      </InputRightElement>
      </InputGroup>
    </FormControl>
    
    <Button colorScheme='blue' width="100%" style={{marginTop:15}} onClick={sumbitHandler} isLoading={loading}>Login</Button>
    <Button variant="solid" colorScheme='red' width="100%" onClick={()=>{setEmail("guest@example.com");setpassword("123456")}}>Get Guest User Credentials</Button>
  </VStack>
  )
}

export default Login
