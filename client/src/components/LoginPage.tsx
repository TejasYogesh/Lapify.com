import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import '../App.css'
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';



const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse: { credential?: string }) => {
    if (credentialResponse.credential && typeof credentialResponse.credential === "string") {
      // Decode the Google credential
      interface DecodedToken {
        sub: string;
        name: string;
        email: string;
      }

      const decoded: DecodedToken = jwtDecode<DecodedToken>(credentialResponse.credential);

      // Prepare user data
      const userData = {
        googleId: decoded.sub, // Google ID
        name: decoded.name,
        email: decoded.email,
      };

      try {
        // Send the data to the backend API
        const response = await axios.post(
          "http://localhost:5000/api/save-google-id", // Backend API endpoint
          userData
        );
        console.log("Response from server:", response.data);
        navigate("/home"); // Redirect to home page
        
      } catch (error) {
        console.error("Error saving Google ID:", error);
      }
    } else {
      console.error("Credential is undefined");
    }
  };
  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
        auto_select={true}
      />
    </div>
  );
};



export default function LoginPage({

  className,
  ...props
}: React.ComponentProps<"div">) {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/save-email-user", {
        email,
        password,
      });
      console.log("Response from server:", response.data);
      alert("User saved successfully!");
      navigate("/Listof"); // Redirect to home page
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error saving user. Please try again.");
    }
  };
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>
              <p className="text-2xl">
                Lapify.com
              </p>
            </div>
            <div>
              <img src="Picture1.png" alt="" className="h-14 w-14" />
            </div>
          </CardTitle>

          <CardTitle>
            <div>
              Login to your account
            </div>
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLoginEvent} className="grid gap-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>

                <div className="flex items-center justify-center">
                  <GoogleLoginButton />
                </div>

              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
