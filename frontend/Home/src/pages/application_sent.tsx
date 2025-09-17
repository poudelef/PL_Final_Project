import { useNavigate } from "react-router-dom";
function ApplicationSent() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        textAlign: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>Your application has been successfully submitted.</p>
      <p>Landlord will review you application and contact you.</p>
      <p>Thank You!</p>

      <button
        onClick={() => {
          navigate(-1);
        }}
        className="btn btn-secondary btn-lg"
      >
        Back
      </button>
    </div>
  );
}

export default ApplicationSent;
