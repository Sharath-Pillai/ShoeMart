{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZmM4ZmQ1OWRhYzQ1NWVkMTVlMjc4NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzc4MTU5NTczLCJleHAiOjE3Nzg3NjQzNzN9.kYlfW9bZyWeVHJFcpAhc41B0nQQiDXfAC2aybMoKsfE",
  "user": {
    "id": "69fc8fd59dac455ed15e2784",
    "name": "Sharath Pillai",
    "email": "shartah@gmail.com",
    "role": "user"
  }
}

use in your component
import * as userService from "@/services/userService";

const response = await userService.loginUser({
  email: "user@example.com",
  password: "password123"
});
localStorage.setItem("token", response.data.token);