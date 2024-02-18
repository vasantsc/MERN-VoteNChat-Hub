import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { api_domain } from "../../urls";


const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setConfimpassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState();
  const [loading, setLoading] = useState(false);

const toast = useToast();
const navigate = useNavigate();

  const postDetails = (pic) => {
    setLoading(true);
    if(pic===undefined){
        toast({
            title: 'Please select an Image!',
            description: "We've created your account for you.",
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position:'bottom'
          })
          setLoading(false);
          return;
    }
    if(pic.type==='image/jpeg'||pic.type==='image/png'){
        const data = new FormData();
        data.append("file",pic);
        data.append("upload_preset","VOTENCHAT");
        data.append("cloud_name","votenchat");
        fetch('https://api.cloudinary.com/v1_1/votenchat/image/upload',{
            method:"post",
            body:data
        }).then((res)=>res.json()).then((data)=>{
            setPic(data.url.toString());
          console.log(data.url.toString());
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
            setLoading(false);
        })
    }
    else{
        toast({
            title: 'Please select an Image!',
            description: "We've created your account for you.",
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position:'bottom'
          })
          setLoading(false);
    }
  };
  const sumbitHandler = async () => {
    setLoading(true);
    if(!name||!email||!password||!confirmpassword){
        toast({
            title: 'Please Enter All Fields!',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position:'bottom'
          })
          setLoading(false);
          return;
    }
    if(password!==confirmpassword){
        toast({
            title: 'Password Do Not Match!',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position:'bottom'
          })
          setLoading(false);
          return;
    }
    try{
        const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            `/api/user/register`,
            {
              name,
              email,
              password,
              pic,
            },
            config
          );
          console.log(data);
          toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          setName();
          setEmail();
          setpassword();
          setConfimpassword();
          setPic();
          setLoading(false);
          navigate("/chats");
    } catch(err){
        console.log(err);
        setLoading(false);
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfimpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={sumbitHandler}
        isLoading= {loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
