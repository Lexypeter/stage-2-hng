import React, { useState, useEffect } from "react";
import "./Second.css";
import Third from "./ThirdPage";

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

const Second = ({ ticketType, ticketCount, setStep }) => {
  const [formData, setFormData] = useState({
    fullName: localStorage.getItem("fullName") || "",
    email: localStorage.getItem("email") || "",
    avatar: localStorage.getItem("avatar") || "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [aboutProject, setProject] = useState("");

  useEffect(() => {
    localStorage.setItem("fullName", formData.fullName);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("avatar", formData.avatar);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageFormData = new FormData();
    imageFormData.append("file", file);
    imageFormData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: imageFormData,
      });

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
      } else {
        throw new Error("Invalid response from Cloudinary");
      }
    } catch (error) {
      console.error("Image Upload Error:", error);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.avatar) newErrors.avatar = "Upload an image.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container">
      {!submitted ? (
        <form className="form-box" onSubmit={handleSubmit}>
          <p>Step 2 of 3</p>
          <h2>Attendee Details</h2>

          <label htmlFor="avatarUpload" className="upload-box">
            <div className="upload-content">
              <span className="cloud-icon">☁️</span>
              <p>Drag & drop or click to upload</p>
            </div>
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>

          {formData.avatar && (
            <img src={formData.avatar} alt="Avatar" className="preview-image" />
          )}
          {errors.avatar && <span className="error">{errors.avatar}</span>}

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label>About Project</label>
          <input
            className="about"
            type="text"
            value={aboutProject}
            maxLength={20}
            onChange={(e) => setProject(e.target.value)}
            placeholder="About project"
          />

          <div className="button-group">
            <button type="button" className="back" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit" className="submit">
              Get My Ticket
            </button>
          </div>
        </form>
      ) : (
        <Third
          ticketType={ticketType}
          ticketCount={ticketCount}
          fullName={formData.fullName}
          email={formData.email}
          avatar={formData.avatar}
        />
      )}
    </div>
  );
};

export default Second;
