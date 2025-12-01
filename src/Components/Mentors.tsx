import Avatar from "../assets/avatar.png";
import { IoMail } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { togglestate } from "../store/toggle";
import ProfileCard from "@/imported_components/ProfileCard";
import { wocstate } from "../store/woc";
import { Mentor } from "../types/mentor"
import Loading from "./Loading";
import { mentorstate } from "../store/mentor";//format is id, 
const Mentors = () => {
  const toggle = useRecoilValue(togglestate);
  const mentors_state = useRecoilValueLoadable(mentorstate);
  const mentors = useRecoilValue(mentorstate)
  const woc_state = useRecoilValue(wocstate);
  if (mentors_state.state == "loading") {
    return <Loading />
  }
  else if (mentors_state.state === "hasValue") {
    return (
      <div className="border-2 border-black relative w-screen overflow-x-hidden h-screen bg-[#111722] ">
        <div
          className={` overflow-hidden ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
        >
          <div className="flex justify-center ">
            <div className="bg-white md2:w-[808px]  shadow-custom md2:absolute md2:top-32   z-0  ">
              {/* <div className="italic m-5">
              You can also pitch your own project idea to these mentors. Feel
              free to contact any mentor via email/phone and talk to them about
              the project idea, ask the mentor to float the project if she/he
              agrees to mentor you with your proposed project. A mentor has to
              create the project for it to be considered a valid project.
            </div> */}
              {woc_state ?
                (
                  <>
                    <div className="mt-32 text-[64px] text-[#FFFFFF]"></div>
                    {mentors &&
                      mentors.length > 0 &&
                      mentors.map((x: Mentor) => (
                        x.mentor_name.map((val, key) => (
                          <ProfileCard image_link={x.image_link[key]}
                            mentor_name={val}
                            about={x.about[key]}
                            linkedinID={x.linkedin[key]}
                            githubID={x.github[key]}
                            key={key}/>
                ))
                      ))}
                  </>
                ) : (
                  <div className="flex justify-center m-5 text-[30px] font-stylish font-bold ">
                    WOC Has Not Started Yet
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Mentors;
