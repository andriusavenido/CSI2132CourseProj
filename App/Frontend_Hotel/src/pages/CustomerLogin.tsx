import React, { useState } from "react";
import CustomerLoginForm from "../components/Customer/LoginForm";
import CustomerRegisterForm from "../components/Customer/RegisterForm";
import { useCustomer } from "../context/CustomerContext";

const CustomerAuthPage: React.FC = () => {
  const [view, setView] = useState<"login" | "register">("login");
//   const { customer, customerId, logout } = useCustomer();

//   // if they are already logged in
//   if (customer && customerId) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           backgroundColor: "#f9fafb",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div
//           style={{
//             backgroundColor: "#ffffff",
//             borderRadius: "12px",
//             padding: "2.5rem",
//             maxWidth: "400px",
//             width: "100%",
//             boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
//             textAlign: "center",
//           }}
//         >
//           <p
//             style={{
//               fontSize: "1rem",
//               color: "#374151",
//               marginBottom: "1.5rem",
//             }}
//           >
//             Signed in as customer <strong>#{customerId}</strong>
//           </p>

//           <button
//             onClick={logout}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: "var(--boba-teal)",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               fontWeight: 600,
//               cursor: "pointer",
//             }}
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     );
//   }

  // if not, show authentications stuff
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        alignItems: view === "login" ? "center" : "flex-start",
        justifyContent: "center",
        padding: "2rem",
        overflowY: "auto",
      }}
    >
      {view === "login" ? (
        <CustomerLoginForm
          onCreateAccount={() => setView("register")}
        />
      ) : (
        <CustomerRegisterForm
          onBackToLogin={() => setView("login")}
        />
      )}
    </div>
  );
};

export default CustomerAuthPage;