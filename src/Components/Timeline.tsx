import { useRecoilValue } from "recoil";
import { FaCheckCircle } from "react-icons/fa";
import { togglestate } from "../store/toggle";
import {
  PiNumberCircleEightFill,
  PiNumberCircleFiveFill,
  PiNumberCircleFourFill,
  PiNumberCircleOneFill,
  PiNumberCircleSevenFill,
  PiNumberCircleSixFill,
  PiNumberCircleThreeFill,
  PiNumberCircleTwoFill,
} from "react-icons/pi";
import { PiNumberCircleNineFill } from "react-icons/pi";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { userstate } from "../store/userState";
import axios from "axios";
import { timeline } from "../types/timeline";
import { motion } from "framer-motion";

const Timeline = () => {
  const [status, setstatus] = useState(false);
  const toggle = useRecoilValue(togglestate);
  const [editmode, setmode] = useState<boolean>(false);
  const [timelines, settimeline] = useState<timeline[]>();
  const user = useRecoilValue(userstate);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const updatetimeline = async (id: string, completed: boolean) => {
    try {
      const token = localStorage.getItem("jwt_token");
      const resp = await axios.put(
        `${BASE_URL}/updatetimeline/${id}/${!completed}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setstatus(!status);
      console.log(resp);
    } catch (error) {
      console.error("Error updating timeline:", error);
    }
  };

  useEffect(() => {
    const getTimeline = async () => {
      try {
        const resp = await fetch(`${BASE_URL}/timeline`);
        const response = await resp.json();
        const data = response.timelines;
        settimeline(data);
      } catch (error) {
        console.error("Error fetching timeline:", error);
      }
    };
    getTimeline();
  }, [editmode, status, BASE_URL]);

  const events = [
    { logo: <PiNumberCircleOneFill /> },
    { logo: <PiNumberCircleTwoFill /> },
    { logo: <PiNumberCircleThreeFill /> },
    { logo: <PiNumberCircleFourFill /> },
    { logo: <PiNumberCircleFiveFill /> },
    { logo: <PiNumberCircleSixFill /> },
    { logo: <PiNumberCircleSevenFill /> },
    { logo: <PiNumberCircleEightFill /> },
    { logo: <PiNumberCircleNineFill /> },
  ];

  return (
    <div
      className={`overflow-x-hidden w-screen min-h-screen bg-deep-night ${
        toggle === null ? "" : toggle ? "contract" : "expand"
      }`}
    >
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-no-repeat bg-center h-[250px] sm:h-[350px] md:h-[450px] w-full"
        style={{
          backgroundImage: "url(https://i.imgur.com/F0yCdfn.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-deep-night/70 via-deep-night/50 to-deep-night"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-frost-white to-ice-surge text-center"
          >
            How It Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-cloud-gray text-sm sm:text-base md:text-lg mt-4 text-center max-w-2xl"
          >
            Your journey through Winter of Code
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6 sm:p-8 mb-8"
        >
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ice-surge to-frost-ember mb-4">
              Students
            </h2>
            <p className="text-cloud-gray text-sm sm:text-base leading-relaxed">
              Students contact the mentors they want to work with and write up a
              project proposal for the spring. If selected, students spend a month
              coding under the guidance of their mentors. They're also eligible
              for prizes and goodies.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-frost-ember to-aurora-violet mb-4">
              Mentors
            </h2>
            <p className="text-cloud-gray text-sm sm:text-base leading-relaxed">
              Willing seniors from institute or alumni can choose to mentor a
              student project. Mentors and students work together to determine
              appropriate milestones and requirements for the spring. Mentor
              interaction is a vital part of the program.
            </p>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-frost-white">
              Timeline
            </h2>
            {user && user.role === "scrummaster" && (
              <Button
                variant="contained"
                onClick={() => setmode(!editmode)}
                sx={{
                  background: "linear-gradient(135deg, #00C6FF 0%, #5B8CFF 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #00B4E6 0%, #4A7BE6 100%)",
                  },
                }}
              >
                {editmode ? "Done Editing" : "Edit Page"}
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {timelines && timelines.length > 0 ? (
              timelines.map((x: timeline, index) => (
                <motion.div
                  key={x.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass rounded-xl p-4 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      {editmode ? (
                        <div className="w-8 h-8 rounded-full bg-cold-slate flex items-center justify-center">
                          <span className="text-cloud-gray text-sm">
                            {index + 1}
                          </span>
                        </div>
                      ) : x.completed ? (
                        <div className="text-ice-surge text-2xl sm:text-3xl">
                          <FaCheckCircle />
                        </div>
                      ) : (
                        <div className="text-cloud-gray text-2xl sm:text-3xl">
                          {events[index]?.logo}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-ice-surge">
                          {x.date}
                        </h3>
                        {editmode && (
                          <Button
                            size="small"
                            variant="contained"
                            color={x.completed ? "primary" : "error"}
                            onClick={() => updatetimeline(x.id, x.completed)}
                            sx={{ fontSize: "0.75rem" }}
                          >
                            {x.completed ? "Completed" : "Not Completed"}
                          </Button>
                        )}
                      </div>

                      <ul className="space-y-1">
                        {x.events.map((y, eventIndex) => (
                          <li
                            key={eventIndex}
                            className="text-frost-white text-sm sm:text-base flex items-start gap-2"
                          >
                            <span className="text-ice-surge mt-1.5">•</span>
                            <span>{y}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-cloud-gray">
                No timeline events available.
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-12">
        <p className="text-center text-xs sm:text-sm text-cloud-gray/60">
          © 2025 Winter of Code. Crafted with frost & code.
        </p>
      </footer>
    </div>
  );
};

export default Timeline;
