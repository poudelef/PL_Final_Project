import kitchen from "../assets/Kitchen.png";
import wooden from "../assets/wooden.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#0000",
      }}
    >
      {/* ===== HERO ===== */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          backgroundImage: `url(${wooden})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        {/* top-right nav actions */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 24,
            display: "flex",
            gap: 12,
            zIndex: 3,
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          <button
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.6)",
              background: "rgba(0,0,0,0.25)",
              color: "#fff",
              fontSize: 14,
              cursor: "pointer",
              backdropFilter: "blur(4px)",
              transition: "transform 180ms ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1.0)")
            }
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </button>
          <button
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "none",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
              color: "#111",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
              transition: "transform 180ms ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1.0)")
            }
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign up
          </button>
        </div>

        {/* subtle right-side gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(270deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.10) 55%, rgba(0,0,0,0) 75%)",
            zIndex: 1,
          }}
        />

        {/* right hero copy */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "5%",
            transform: "translateY(-50%)",
            zIndex: 2,
            color: "#fff",
            textAlign: "right",
            maxWidth: 560,
            width: "90%",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px, 5vw, 64px)",
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "0.5px",
              textShadow: "0 6px 24px rgba(0,0,0,0.45)",
            }}
          >
            Find Your Perfect Home
          </h1>

          <p
            style={{
              marginTop: 12,
              fontSize: "clamp(14px, 1.6vw, 20px)",
              lineHeight: 1.35,
              opacity: 0.95,
              textShadow: "0 4px 16px rgba(0,0,0,0.45)",
            }}
          >
            Welcome to comfort crafted in timber—rent, buy, or just get
            inspired.
          </p>

          <div
            style={{
              marginTop: 20,
              display: "inline-flex",
              gap: 12,
              alignItems: "center",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "12px 22px",
                borderRadius: 999,
                border: "none",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(230,230,230,0.95))",
                color: "#111",
                fontWeight: 800,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
                transition: "transform 180ms ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-1px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              onClick={() => {
                navigate("/apartments");
              }}
            >
              Browse Listings
            </button>

            <button
              style={{
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.7)",
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                transition: "transform 180ms ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-1px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              onClick={() => {
                navigate("/login");
              }}
            >
              List Your Property
            </button>
          </div>
        </div>
      </div>

      {/* ===== TWO-COLUMN SECTION ===== */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "stretch",
          padding: "56px 6%",
          background:
            "linear-gradient(180deg, #0b0b0b 0%, #121212 60%, #151515 100%)",
          color: "#fff",
          fontFamily: "'Exo 2', sans-serif",
        }}
      >
        {/* Left: image card */}
        <div
          style={{
            position: "relative",
            minHeight: 420,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
            backgroundImage: `url(${kitchen})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.0) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 16,
              right: 18,
              padding: "10px 16px",
              borderRadius: 999,
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: 13,
              backdropFilter: "blur(4px)",
            }}
          >
            Natural Timber • Cozy • Minimal
          </div>
        </div>

        {/* Right: About + Contact */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(24px, 3.5vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "0.4px",
              fontWeight: 800,
            }}
          >
            About Our Wooden Homes
          </h2>
          <p
            style={{
              margin: 0,
              opacity: 0.9,
              fontSize: "clamp(14px, 1.4vw, 18px)",
              lineHeight: 1.6,
            }}
          >
            We curate cabins and eco-homes that blend warmth, design, and
            sustainability. Whether you’re listing your property or searching
            for a tranquil retreat, our platform makes it effortless.
          </p>

          {/* quick stats row */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Verified Listings", value: "500+" },
              { label: "Host Response Time", value: "~2h" },
              { label: "Avg. Rating", value: "4.8/5" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 16px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.8 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* contact / CTA row */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 6,
            }}
          >
            <button
              style={{
                padding: "12px 20px",
                borderRadius: 14,
                border: "none",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(230,230,230,0.95))",
                color: "#111",
                fontWeight: 800,
                fontSize: 15,
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
                transition: "transform 180ms ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-1px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              onClick={() => {
                /* navigate('/about') */
              }}
            >
              Learn More
            </button>

            <button
              style={{
                padding: "12px 20px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                transition: "transform 180ms ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-1px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              onClick={() => {
                /* navigate('/contact') */
              }}
            >
              Contact Us
            </button>

            {/* contact chips */}
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  fontSize: 13,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                ✉️ poudelsb@mail.uc.edu
              </span>
              <span
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  fontSize: 13,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                ☎️ +1 (513) 276-2979
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER (mini) ===== */}
      <footer
        style={{
          padding: "18px 6%",
          background: "#0b0b0b",
          color: "rgba(255,255,255,0.7)",
          fontFamily: "'Exo 2', sans-serif",
          fontSize: 13,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span>© {new Date().getFullYear()} Nest poudelef</span>
        <div style={{ display: "flex", gap: 14 }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
            Privacy
          </a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
            Terms
          </a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
            Support
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
