// // ======================================
// // FILE: /Pages/auth/SocialLoginSuccess.jsx
// // ======================================
// import { useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useAuth } from '../../../context/auth';
// import axios from 'axios';

// const SocialLoginSuccess = () => {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   const [auth, setAuth] = useAuth();

//   useEffect(() => {
//     const token = params.get("token");
//     if (token) {
//       axios.get("/api/v1/auth/me", {
//         headers: { Authorization: token }
//       }).then(res => {
//         setAuth({ user: res.data.user, token });
//         localStorage.setItem("auth", JSON.stringify({ user: res.data.user, token }));

//         if (res.data.user.role === 1) {
//           navigate("/dashboard/admin");
//         } else {
//           navigate("/dashboard/user");
//         }
//       });
//     }
//   }, []);

//   return <div>Logging in via Google...</div>;
// };

// export default SocialLoginSuccess;
