import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { togglestate } from "../store/toggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userstate } from "../store/userState";
import { motion } from "framer-motion";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Profile: React.FC = () => {
  const [user, setuser] = useRecoilState(userstate);
  const [change, setchange] = useState(false);
  const [check, setcheck] = useState(false);

  useEffect(() => {
    const getuser = async () => {
      if (user) {
        try {
          const token = localStorage.getItem("jwt_token");
          const userinfo = await axios.get(`${BASE_URL}/userinfo/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (userinfo.data.success != "true") {
            setcheck(false);
            setFirstName(user.first_name);
            setLastName(user.last_name);
          } else {
            setcheck(true);
            setFirstName(userinfo.data.user.first_name);
            setLastName(userinfo.data.user.last_name);
            setrole(userinfo.data.user.role);
            setSelectedBranch(userinfo.data.user.branch);
            setGithubLink(userinfo.data.user.githublink);
            setPhoneNumber(userinfo.data.user.phonenumber);
            setSelectedGender(userinfo.data.user.gender);
            setSelectedYear(userinfo.data.user.year);
            localStorage.setItem("jwt_token", userinfo.data.token);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };
    getuser();
  }, [user]);

  const navigate = useNavigate();
  const toggle = useRecoilValue(togglestate);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setrole] = useState("1");

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      firstName,
      lastName,
      selectedYear,
      selectedGender,
      selectedBranch,
      githubLink,
      phoneNumber,
    });
  };

  const createuser = async () => {
    if (user && typeof user.id === "string") {
      const updateuser = {
        ...user,
        year: selectedYear,
        branch: selectedBranch,
        githublink: githubLink,
        gender: selectedGender,
        phonenumber: parseInt(phoneNumber),
        role: role,
        first_name: firstName,
        last_name: lastName,
      };
      setuser(updateuser);
      if (!check && user) {
        try {
          await axios.post(`${BASE_URL}/check-duplicate-username`, {
            first_name: firstName,
            last_name: lastName,
          });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            alert(error.response?.data.detail || "An error occurred.");
          } else {
            alert("An unexpected error occurred.");
          }
          return;
        }
        const token = localStorage.getItem("jwt_token");
        const response = await axios.post(
          `${BASE_URL}/user`,
          {
            first_name: firstName,
            last_name: lastName,
            year: selectedYear,
            email: user.email,
            branch: selectedBranch,
            githublink: githubLink,
            gender: selectedGender,
            phonenumber: phoneNumber,
            role: role,
            id: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
        if (response.data.success == "true") {
          localStorage.setItem("jwt_token", response.data.jwt_token);
          navigate("/");
        }
      } else if (check && change && user) {
        const updateduser = {
          first_name: firstName,
          last_name: lastName,
          year: selectedYear,
          branch: selectedBranch,
          githublink: githubLink,
          gender: selectedGender,
          phonenumber: phoneNumber,
          role: role,
          email: user.email,
          id: user.id,
        };
        const response = await axios.put(
          `${BASE_URL}/updateuser`,
          {
            updateduser,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        console.log(response);
        navigate("/");
      } else {
        navigate("/");
      }
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setchange(true);
    const { name, value } = event.target;
    switch (name) {
      case "first-name":
        setFirstName(value);
        break;
      case "last-name":
        setLastName(value);
        break;
      case "role":
        setrole(value);
        break;
      case "years":
        setSelectedYear(value);
        break;
      case "gender":
        setSelectedGender(value);
        break;
      case "branches":
        setSelectedBranch(value);
        break;
      case "github":
        setGithubLink(value);
        break;
      case "phone-number":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-arctic-steel border border-white/10 rounded-lg text-frost-white placeholder-cloud-gray/50 focus:outline-none focus:border-ice-surge focus:ring-1 focus:ring-ice-surge transition-all duration-200";
  const labelClass = "block text-sm font-medium text-frost-white mb-2";
  const selectClass =
    "w-full px-4 py-3 bg-arctic-steel border border-white/10 rounded-lg text-frost-white focus:outline-none focus:border-ice-surge focus:ring-1 focus:ring-ice-surge transition-all duration-200 appearance-none cursor-pointer";

  return (
    <div
      className={`overflow-x-hidden min-h-screen bg-deep-night ${
        toggle === null ? "" : toggle ? "contract" : "expand"
      }`}
    >
      {/* Header */}
      <div className="relative h-[120px] sm:h-[180px] w-full bg-gradient-to-r from-arctic-steel via-cold-slate to-arctic-steel">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-deep-night/50"></div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-2xl p-6 sm:p-10"
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-frost-white mb-2">
              {check ? "Update Profile" : "Create Profile"}
            </h1>
            <p className="text-cloud-gray text-sm sm:text-base">
              Your Winter of Code's Official Account Details
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className={labelClass}>
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={firstName}
                  required
                  onChange={handleInputChange}
                  className={`${inputClass} ${!firstName ? "border-red-500/50" : ""}`}
                  placeholder="Enter first name"
                />
                {!firstName && (
                  <p className="text-red-400 text-xs mt-1">First name is required</p>
                )}
              </div>

              <div>
                <label htmlFor="last-name" className={labelClass}>
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  value={lastName}
                  required
                  onChange={handleInputChange}
                  className={`${inputClass} ${!lastName ? "border-red-500/50" : ""}`}
                  placeholder="Enter last name"
                />
                {!lastName && (
                  <p className="text-red-400 text-xs mt-1">Last name is required</p>
                )}
              </div>
            </div>

            {/* Year Select */}
            <div>
              <label htmlFor="years" className={labelClass}>
                Select Your Year
              </label>
              <select
                id="years"
                name="selectedYear"
                className={selectClass}
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setchange(true);
                }}
              >
                <option value="0">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            {/* Gender Select */}
            <div>
              <label htmlFor="gender" className={labelClass}>
                Gender
              </label>
              <select
                id="gender"
                name="selectedGender"
                value={selectedGender}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  setchange(true);
                }}
                className={selectClass}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Branch Select */}
            <div>
              <label htmlFor="branches" className={labelClass}>
                Branch
              </label>
              <select
                id="branches"
                name="selectedBranch"
                className={selectClass}
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setchange(true);
                }}
              >
                <option value="">Select Branch</option>
                <option value="ch">Chemical Engineering</option>
                <option value="ai">Artificial Intelligence and Data Science</option>
                <option value="ee">Electrical Engineering</option>
                <option value="me">Mechanical Engineering</option>
                <option value="cse">Computer Science and Engineering</option>
                <option value="ci">Civil Engineering</option>
                <option value="mt">Materials Engineering</option>
                <option value="bsbe">Bioscience and Biotechnology</option>
                <option value="es">Engineering Science</option>
                <option value="ph">Bachelor of Science (Physics)</option>
                <option value="cy">Bachelor of Science (Chemistry)</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Github Link */}
            <div>
              <label htmlFor="github" className={labelClass}>
                Github Link
              </label>
              <input
                type="url"
                name="github"
                id="github"
                autoComplete="url"
                value={githubLink}
                required
                onChange={handleInputChange}
                className={`${inputClass} ${!githubLink ? "border-red-500/50" : ""}`}
                placeholder="https://github.com/username"
              />
              {!githubLink && (
                <p className="text-red-400 text-xs mt-1">Github link is required</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone-number" className={labelClass}>
                Phone number
              </label>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                value={phoneNumber}
                required
                onChange={handleInputChange}
                className={`${inputClass} ${
                  !phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)
                    ? "border-red-500/50"
                    : ""
                }`}
                placeholder="Enter 10 digit phone number"
              />
              {(!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) && (
                <p className="text-red-400 text-xs mt-1">
                  Phone number must be exactly 10 digits
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={createuser}
                disabled={
                  !firstName ||
                  !lastName ||
                  !githubLink ||
                  !/^[0-9]{10}$/.test(phoneNumber)
                }
                type="submit"
                className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  !firstName ||
                  !lastName ||
                  !githubLink ||
                  !/^[0-9]{10}$/.test(phoneNumber)
                    ? "bg-cold-slate text-cloud-gray cursor-not-allowed"
                    : "bg-gradient-to-r from-ice-surge to-frost-ember text-deep-night hover:shadow-[0_0_30px_rgba(0,198,255,0.4)]"
                }`}
              >
                {check ? "Save Changes" : "Create Profile"}
              </button>

              {(!firstName ||
                !lastName ||
                !githubLink ||
                (phoneNumber && !/^[0-9]{10}$/.test(phoneNumber))) && (
                <p className="text-red-400 text-sm text-center mt-3">
                  Please fill in all required fields correctly.
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
