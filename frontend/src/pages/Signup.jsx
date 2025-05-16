import { useState } from "react"
import { Heading } from "../components/Header"
import { Subheading } from "../components/Subheading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup =()=>{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    return <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center rounded-t-lg w-[450px] h-[600px] bg-white shadow-[0_20px_50px_black] ">
            <div className="rounded-lg w-full font-sans text-center p-2 h-max ">
            <Heading label={"Sign Up"}/>
            <Subheading label={"Enter your information to create your account"}/>
            <InputBox onChange={(e)=>{
                setFirstName(e.target.value)
            }} placeholder="John" label={"First Name"}/>
            <InputBox onChange={(e)=>{
                setLastName(e.target.value)
            }} placeholder="Doe" label={"Last Name"}/>
            <InputBox onChange={(e)=>{
                setUserName(e.target.value)
            }} placeholder="subodhsingh@gmail.com" label={"Email Id"}/>
            <InputBox onChange={(e)=>{
                setPassword(e.target.value)
            }} placeholder="hkirat123" label={"Password"}/>
            <Button onClick={async()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                    username,
                    firstName,
                    lastName,
                    password 
                })
                localStorage.setItem("token", response.data.token) // way of stroing the token in localstorage for continuos session login
                // remember this is not the html button, this is the component and in Button.jsx onclick is pass in original html button
                navigate("/dashboard")
            }} label={"Sign up"}/>
            </div>
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
        </div>
    </div>
    
}