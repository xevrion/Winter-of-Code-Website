import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { togglestate } from "../store/toggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userstate } from "../store/userState";
import { motion } from "framer-motion";
import { FaGithub, FaPhone, FaUser, FaGraduationCap } from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Profileview: React.FC = () => {
  const [user, setuser] = useRecoilState(userstate);

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
            setFirstName(user.first_name);
            setLastName(user.last_name);
          } else {
            setFirstName(userinfo.data.user.first_name);
            setLastName(userinfo.data.user.last_name);
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

  const getBranchName = (code: string) => {
    const branches: Record<string, string> = {
      ch: "Chemical Engineering",
      ai: "Artificial Intelligence and Data Science",
      ee: "Electrical Engineering",
      me: "Mechanical Engineering",
      cse: "Computer Science and Engineering",
      ci: "Civil Engineering",
      mt: "Materials Engineering",
      bsbe: "Bioscience and Biotechnology",
      es: "Engineering Science",
      ph: "Bachelor of Science (Physics)",
      cy: "Bachelor of Science (Chemistry)",
      other: "Other",
    };
    return branches[code] || code;
  };

  const getYearName = (year: string) => {
    const years: Record<string, string> = {
      "1": "1st Year",
      "2": "2nd Year",
      "3": "3rd Year",
      "4": "4th Year",
    };
    return years[year] || year;
  };

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

      {/* Profile Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-2xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-ice-surge/10 to-frost-ember/10 p-6 sm:p-8 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-ice-surge to-frost-ember p-0.5">
                <div className="w-full h-full rounded-full bg-arctic-steel flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold text-frost-white">
                    {firstName.charAt(0)}
                    {lastName.charAt(0)}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-frost-white">
                  {firstName} {lastName}
                </h1>
                <p className="text-cloud-gray text-sm sm:text-base">
                  Winter of Code Participant
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Year */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ice-surge/10 flex items-center justify-center">
                    <FaGraduationCap className="text-ice-surge" />
                  </div>
                  <div>
                    <p className="text-cloud-gray text-xs">Year</p>
                    <p className="text-frost-white font-medium">
                      {getYearName(selectedYear) || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-frost-ember/10 flex items-center justify-center">
                    <FaUser className="text-frost-ember" />
                  </div>
                  <div>
                    <p className="text-cloud-gray text-xs">Gender</p>
                    <p className="text-frost-white font-medium capitalize">
                      {selectedGender || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Branch */}
              <div className="glass rounded-xl p-4 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-aurora-violet/10 flex items-center justify-center">
                    <FaGraduationCap className="text-aurora-violet" />
                  </div>
                  <div>
                    <p className="text-cloud-gray text-xs">Branch</p>
                    <p className="text-frost-white font-medium">
                      {getBranchName(selectedBranch) || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cryo-mint/10 flex items-center justify-center">
                    <FaPhone className="text-cryo-mint" />
                  </div>
                  <div>
                    <p className="text-cloud-gray text-xs">Phone</p>
                    <p className="text-frost-white font-medium">
                      {phoneNumber || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Github */}
              <div className="glass rounded-xl p-4">
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <FaGithub className="text-frost-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-cloud-gray text-xs">GitHub</p>
                    <p className="text-frost-white font-medium truncate group-hover:text-ice-surge transition-colors">
                      {githubLink
                        ? githubLink.replace("https://github.com/", "@")
                        : "Not linked"}
                    </p>
                  </div>
                  <HiOutlineArrowUpRight className="text-cloud-gray group-hover:text-ice-surge transition-colors" />
                </a>
              </div>
            </div>

            {/* Update Button */}
            <button
              onClick={() => navigate("/profile")}
              className="w-full py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-ice-surge to-frost-ember text-deep-night hover:shadow-[0_0_30px_rgba(0,198,255,0.4)] transition-all duration-300"
            >
              Update Profile
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profileview;
