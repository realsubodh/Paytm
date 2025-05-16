import { Button } from "../components/Button"
import { Heading } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import { BottomWarning } from "../components/BottomWarning"


export const Signin =()=>{

    return <div className="min-h-screen flex justify-center items-center">
    <div className="flex flex-col items-center rounded-t-lg w-[450px] h-[600px] bg-white shadow-[0_20px_50px_black] ">
        <div className="rounded-lg w-full font-sans mt-4 text-center p-2 h-max ">
        <Heading label={"Sign In"}/>
        <Subheading label={"Enter your credentials to access your account"}/>
        <div className="mt-10">
        <InputBox placeholder="subodhsingh@gmail.com" label={"Email Id"}/>
        <InputBox placeholder="hkirat123" label={"Password"}/>
        </div>
        <div className="pt-4">
            <Button label={"Sign In"}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
        </div>
    </div>
</div>
}