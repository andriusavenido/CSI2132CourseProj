import React, { useState } from "react";
import { useCustomer } from "../../context/CustomerContext"; 

interface Props {
  onCreateAccount: () => void;
  onLoginSuccess?: () => void; // optional redirect/navigation
}

const CustomerLoginForm: React.FC<Props> = ({
  onCreateAccount,
  onLoginSuccess,
}) => {
  const [customerId, setCustomerId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loadingLocal, setLoadingLocal] = useState(false);

  const { login, loading } = useCustomer();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setLoadingLocal(true);

    try {
      const id = Number(customerId);
      if (!id) {
        setError("Please enter a valid ID.");
        return;
      }

      await login(id); // context handles API + sessionStorage

      onLoginSuccess?.(); // navigate if needed
    } catch {
      setError("Customer not found. Please check your ID.");
    } finally {
      setLoadingLocal(false);
    }
  };

  const isLoading = loading || loadingLocal;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "2.5rem",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          margin: "0 0 0.25rem",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#1a1a1a",
        }}
      >
        Customer Login
      </h2>

      <p
        style={{
          margin: "0 0 2rem",
          fontSize: "0.875rem",
          color: "#6b7280",
        }}
      >
        Sign in with your customer ID
      </p>

      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          <label
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            Customer ID
          </label>

          <input
            type="number"
            placeholder="Enter your customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            style={{
              padding: "0.625rem 0.875rem",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "0.9rem",
              outline: "none",
              color: "#1a1a1a",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            marginTop: "0.5rem",
            padding: "0.75rem",
            backgroundColor: "var(--boba-teal)",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {error && (
        <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          {error}
        </p>
      )}

      <div
        style={{
          marginTop: "1.5rem",
          borderTop: "1px solid #f0f0f0",
          paddingTop: "1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            marginBottom: "0.75rem",
          }}
        >
          Don't have an account?
        </p>

        <button
          onClick={onCreateAccount}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#ffffff",
            color: "var(--boba-teal)",
            border: "1.5px solid var(--boba-teal)",
            borderRadius: "8px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default CustomerLoginForm;