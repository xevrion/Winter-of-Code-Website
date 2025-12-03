import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { BiLogoDiscord } from "react-icons/bi";
import { IoMail } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilValue } from "recoil";
import { togglestate } from "../store/toggle";

const contactItems = [
  {
    id: "github",
    title: "GitHub",
    subtitle: "@devlup-labs",
    href: "https://github.com/devlup-labs",
    cta: "Visit",
    icon: <FaGithub className="text-frost-white w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    id: "discord",
    title: "Discord",
    subtitle: "DevelupLab",
    href: "https://github.com/devlup-labs",
    cta: "Join",
    icon: <BiLogoDiscord className="text-frost-white w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    id: "email",
    title: "Email",
    subtitle: "devluplabs@iitj.ac.in",
    href: "mailto:devluplabs@iitj.ac.in",
    cta: "Mail",
    icon: <IoMail className="text-frost-white w-5 h-5 sm:w-6 sm:h-6" />,
  },
];

const studentFaqs = [
  {
    q: "When can students apply for WoC?",
    a: "Please see the program timeline in How It Works section for more detailed information.",
  },
  {
    q: "What programming language(s) should I know to participate in WoC?",
    a: "The programming language you need to know depends with which mentor you are interested in working with. You should be familiar with the programming language(s) used in that project.",
  },
  {
    q: "Can I submit more than one proposal?",
    a: "Yes, each student may submit up to two proposals. However, only one per student may be accepted.",
  },
  {
    q: "Can a group submit a proposal together to work on a single project?",
    a: "While we may allow more than one student per project but it'll be prioritised to assign one project per person.",
  },
  {
    q: "Should I send proposals directly to the mentor?",
    a: "No, all proposals should be submitted to the program site.",
  },
];

const mentorFaqs = [
  {
    q: "Are mentors required to use the code produced by students?",
    a: "No. While we hope that all the code that comes out of this program is useful, it's not mandatory for the mentor to use students' code.",
  },
  {
    q: "Where will WoC happen?",
    a: "WoC occurs entirely online; you don't need to leave your room.",
  },
  {
    q: "Can I participate in WoC as both a mentor and a student?",
    a: "No. It'll not be feasible to work as both and it can hamper the chances of project's completion.",
  },
  {
    q: "What if I have more questions?",
    a: "Check out the Student Guide and the Mentor Guide available on the homepage.",
  },
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState({ section: "students", idx: -1 });
  const toggle = useRecoilValue(togglestate);

  const toggleOpen = (section: string, idx: number) => {
    setOpenIndex((s) =>
      s.section === section && s.idx === idx
        ? { section, idx: -1 }
        : { section, idx }
    );
  };

  const panelVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  return (
    <div
      className={`bg-deep-night min-h-screen text-frost-white ${
        toggle === null ? "" : toggle ? "contract" : "expand"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ice-surge/10 border border-ice-surge/20 text-ice-surge text-xs font-medium mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ice-surge opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ice-surge"></span>
              </span>
              Support
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="text-frost-white">Frequently Asked </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-surge to-frost-ember">
                Questions
              </span>
            </h1>
            <p className="text-cloud-gray text-base sm:text-lg max-w-xl">
              Find answers for students and mentors — reach out if you still
              need help.
            </p>
          </motion.div>

          {/* Contact Cards - Desktop */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block w-72"
          >
            <h2 className="text-xl font-bold text-frost-white mb-4">
              Contact Us
            </h2>
            <div className="space-y-3">
              {contactItems.map((c) => (
                <a
                  key={c.id}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-3 p-3 glass-card rounded-xl hover:border-ice-surge/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-ice-surge to-frost-ember flex items-center justify-center">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-frost-white text-sm truncate">
                      {c.title}
                    </div>
                    <div className="text-xs text-cloud-gray truncate">
                      {c.subtitle}
                    </div>
                  </div>
                  <div className="text-xs bg-arctic-steel px-2 py-1 rounded-md text-ice-surge border border-ice-surge/20">
                    {c.cta}
                  </div>
                </a>
              ))}
            </div>
          </motion.aside>
        </div>

        {/* Contact Cards - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:hidden mb-10"
        >
          <h2 className="text-lg font-bold text-frost-white mb-3">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {contactItems.map((c) => (
              <a
                key={c.id}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 p-3 glass-card rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-ice-surge to-frost-ember flex items-center justify-center flex-shrink-0">
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-frost-white text-sm truncate">
                    {c.title}
                  </div>
                  <div className="text-xs text-cloud-gray truncate">
                    {c.subtitle}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Student FAQs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h3 className="text-lg font-semibold text-frost-white mb-4">
            Student FAQs
          </h3>
          <div className="space-y-3">
            {studentFaqs.map((f, i) => (
              <div
                key={`student-${i}`}
                onClick={() => toggleOpen("students", i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    toggleOpen("students", i);
                }}
                aria-expanded={
                  openIndex.section === "students" && openIndex.idx === i
                }
                className="glass-card rounded-xl p-4 cursor-pointer hover:border-ice-surge/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-frost-white text-sm sm:text-base pr-4">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{
                      rotate:
                        openIndex.section === "students" && openIndex.idx === i
                          ? 180
                          : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-ice-surge flex-shrink-0"
                  >
                    ⌵
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex.section === "students" && openIndex.idx === i && (
                    <motion.div
                      key={`panel-student-${i}`}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={panelVariants}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-cloud-gray text-sm sm:text-base overflow-hidden"
                    >
                      {f.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Mentor FAQs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-frost-white mb-4">
            Mentor FAQs
          </h3>
          <div className="space-y-3">
            {mentorFaqs.map((f, i) => (
              <div
                key={`mentor-${i}`}
                onClick={() => toggleOpen("mentors", i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    toggleOpen("mentors", i);
                }}
                aria-expanded={
                  openIndex.section === "mentors" && openIndex.idx === i
                }
                className="glass-card rounded-xl p-4 cursor-pointer hover:border-ice-surge/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-frost-white text-sm sm:text-base pr-4">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{
                      rotate:
                        openIndex.section === "mentors" && openIndex.idx === i
                          ? 180
                          : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-ice-surge flex-shrink-0"
                  >
                    ⌵
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex.section === "mentors" && openIndex.idx === i && (
                    <motion.div
                      key={`panel-mentor-${i}`}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={panelVariants}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-cloud-gray text-sm sm:text-base overflow-hidden"
                    >
                      {f.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <p className="text-center text-xs sm:text-sm text-cloud-gray/60">
          © 2025 Winter of Code. Crafted with frost & code.
        </p>
      </footer>
    </div>
  );
}
