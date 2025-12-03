import React from "react";
import logo from "../assets/devlup.png";
import { togglestate } from "../store/toggle";
import { useRecoilValue } from "recoil";
import ProjectCard from "../Components/newProjectcard";
import { useState, useEffect } from "react";
import axios from "axios";
import { program } from "../types/program";
import { motion } from "framer-motion";

const Programs: React.FC = () => {
  const [programs, setprograms] = useState<program[] | undefined>(undefined);
  const [temp, settemp] = useState("");
  const [query, setquery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const resp = await axios.get(`${BASE_URL}/pastprograms`);
        if (!mounted) return;
        setprograms(resp.data);
      } catch (err: any) {
        console.error("Failed to fetch past programs", err);
        if (!mounted) return;
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load programs. Please try again later."
        );
        setprograms([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [BASE_URL]);

  const q = (query ?? "").toLowerCase();

  const filteredPrograms = (programs ?? []).filter((x) => {
    return (
      x.title.toLowerCase().includes(q) ||
      x.mentor.toLowerCase().includes(q) ||
      x.mentee.some((m) => m.toLowerCase().includes(q)) ||
      x.year.toLowerCase().includes(q) ||
      x.description.toLowerCase().includes(q) ||
      x.technology.toLowerCase().includes(q)
    );
  });

  const toggle = useRecoilValue(togglestate);

  return (
    <div
      className={`min-h-screen bg-deep-night transition-all duration-300 ${
        toggle === null ? "" : toggle ? "contract" : "expand"
      }`}
    >
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-arctic-steel/50 to-deep-night"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Column */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ice-surge/10 border border-ice-surge/20 text-ice-surge text-xs font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ice-surge opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-ice-surge"></span>
                  </span>
                  Archive
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  <span className="text-frost-white">Past Programs of </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-surge to-frost-ember">
                    WOC
                  </span>
                </h1>
                <p className="text-cloud-gray text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Explore the projects and achievements from previous Winter of
                  Code editions.
                </p>
              </motion.div>
            </div>

            {/* Logo Column */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl glass p-4 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="WOC logo"
                  className="object-contain w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl p-4 sm:p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                aria-label="Search programs"
                placeholder="Search by project, mentor, technology..."
                className="w-full px-4 py-3 bg-arctic-steel border border-white/10 rounded-xl text-frost-white placeholder-cloud-gray/50 focus:outline-none focus:border-ice-surge focus:ring-1 focus:ring-ice-surge transition-all duration-200"
                value={temp}
                onChange={(e) => settemp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setquery(temp)}
              />
              {temp && (
                <button
                  aria-label="Clear input"
                  onClick={() => {
                    settemp("");
                    setquery("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cloud-gray hover:text-frost-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setquery(temp)}
                className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-ice-surge to-frost-ember text-deep-night font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(0,198,255,0.4)] transition-all duration-300"
              >
                Search
              </button>
              <button
                onClick={() => {
                  settemp("");
                  setquery("");
                }}
                className="px-4 py-3 glass rounded-xl text-cloud-gray hover:text-frost-white hover:border-white/20 transition-all duration-200"
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <div>
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-xl">
                <div className="w-5 h-5 border-2 border-ice-surge border-t-transparent rounded-full animate-spin"></div>
                <span className="text-cloud-gray">Loading programs...</span>
              </div>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <div className="inline-block p-6 glass rounded-2xl border border-red-500/20">
                <div className="font-semibold text-red-400 mb-2">
                  Unable to load programs
                </div>
                <div className="text-sm text-cloud-gray">{error}</div>
              </div>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-6 text-cloud-gray text-sm">
                {filteredPrograms.length > 0 ? (
                  <span>
                    Showing{" "}
                    <span className="text-frost-white font-medium">
                      {filteredPrograms.length}
                    </span>{" "}
                    {filteredPrograms.length === 1 ? "project" : "projects"}
                    {query && (
                      <>
                        {" "}
                        for "
                        <span className="text-ice-surge">{query}</span>"
                      </>
                    )}
                  </span>
                ) : (
                  <span>No projects found</span>
                )}
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.length === 0 ? (
                  <div className="col-span-full p-8 glass rounded-2xl text-center">
                    <p className="text-cloud-gray">
                      No programs found. Try adjusting your search terms.
                    </p>
                  </div>
                ) : (
                  filteredPrograms.map((x, index) => (
                    <motion.div
                      key={x.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex justify-center"
                    >
                      <div className="w-full">
                        <ProjectCard
                          year={x.year}
                          mentor={x.mentor}
                          description={x.description}
                          title={x.title}
                          mentee={x.mentee}
                          technology={x.technology}
                          codelink={x.codelink}
                        />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <p className="text-center text-xs sm:text-sm text-cloud-gray/60">
          © 2025 Winter of Code. Crafted with frost & code.
        </p>
      </footer>
    </div>
  );
};

export default Programs;
