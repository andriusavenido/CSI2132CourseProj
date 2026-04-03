import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createCustomer } from "../../api/customer";
import type { Customer } from "../../api/customer";
import { useCustomer } from "../../context/CustomerContext";

interface Props {
  onBackToLogin: () => void;
}

const CustomerRegisterForm: React.FC<Props> = ({ onBackToLogin }) => {
  const navigate = useNavigate();
  const { login } = useCustomer();

  const [form, setForm] = useState<Customer>({
    phone_number: "",
    full_name: "",
    street: "",
    city: "",
    zip_code: "",
    country: "",
    ssn_sin: "",
    id_type: "",
    date_of_registration: new Date().toISOString(),
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await createCustomer(form);

      // return with customer id
      const newCustomerId = res.customer?.id;

      if (!newCustomerId) {
        throw new Error("Missing customer ID");
      }

      // auto login after registration
      await login(newCustomerId);

      navigate("/customer/chains");
    } catch {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields: {
    label: string;
    name: keyof Customer;
    placeholder?: string;
  }[] = [
    { label: "Full Name", name: "full_name", placeholder: "Jane Doe" },
    { label: "Phone Number", name: "phone_number", placeholder: "514-123-4567" },
    { label: "SSN / SIN", name: "ssn_sin", placeholder: "123-456-789" },
    { label: "ID Type", name: "id_type", placeholder: "Driver's License / Passport" },
    { label: "Street", name: "street", placeholder: "123 Main St" },
    { label: "City", name: "city", placeholder: "Montreal" },
    { label: "Zip / Postal Code", name: "zip_code", placeholder: "H2X 1Y4" },
    { label: "Country", name: "country", placeholder: "Canada" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f9fafb",
        padding: "3rem 2rem",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <button
          type="button"
          onClick={onBackToLogin}
          style={{
            background: "none",
            border: "none",
            color: "var(--boba-teal)",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          ← Back to Login
        </button>

        <h2
          style={{
            margin: "0 0 0.25rem",
            fontSize: "1.75rem",
            fontWeight: 600,
            color: "#1a1a1a",
          }}
        >
          Create Customer Account
        </h2>

        <p
          style={{
            margin: "0 0 2.5rem",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          Fill in your details to register
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
          }}
        >
          {fields.map(({ label, name, placeholder }) => (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.375rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                }}
              >
                {label}
              </label>

              <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={form[name] ?? ""}
                onChange={handleChange}
                required={name !== "zip_code"}
                style={{
                  padding: "0.625rem 0.875rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  outline: "none",
                  color: "#1a1a1a",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>
          ))}

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginTop: "0.5rem",
            }}
          >
            {error && (
              <p style={{ color: "#dc2626", fontSize: "0.875rem", margin: 0 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.75rem",
                backgroundColor: "var(--boba-teal)",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegisterForm;