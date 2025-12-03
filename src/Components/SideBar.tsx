import { Link } from "react-router-dom";
import { MdContentPasteSearch } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { togglestate } from "../store/toggle";
import { FaCalendarDays } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { IoPeopleSharp, IoCodeSlash } from "react-icons/io5";
import { FaTachometerAlt } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { userstate } from "../store/userState";
import { IoClose } from "react-icons/io5";

const Sidebar: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const user = useRecoilValue(userstate);
  const [toggle, settoggle] = useRecoilState(togglestate);

  const navItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/how-it-works", icon: <FaCalendarDays />, label: "How It Works" },
    { to: "/mentors", icon: <IoPeopleSharp />, label: "Mentors" },
    { to: "/ideas", icon: <FaLightbulb />, label: "Ideas" },
    { to: "/projects", icon: <IoCodeSlash />, label: "Projects" },
    { to: "/pastprogram", icon: <MdContentPasteSearch />, label: "Past Programs" },
    { to: "/help", icon: <IoMdHelpCircle />, label: "Help" },
  ];

  return (
    <aside
      className={`fixed md2:w-[300px] w-full h-screen bg-arctic-steel border-r border-white/10 shadow-2xl mt-0 z-50 ${
        toggle === null
          ? "hidden"
          : toggle
          ? "activeDrawer"
          : "inactiveDrawer"
      }`}
      data-booted={true}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <span className="text-frost-white font-bold text-lg">Menu</span>
        <button
          onClick={() => settoggle(!toggle)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <IoClose className="w-5 h-5 text-frost-white" />
        </button>
      </div>

      {/* Navigation */}
      <div className="py-4 px-3 space-y-1">
        {/* Admin Link */}
        {user?.role === "scrummaster" && (
          <Link to="/admin">
            <div
              onClick={() => settoggle(!toggle)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-frost-white hover:bg-ice-surge/10 border-l-4 border-transparent hover:border-ice-surge transition-all duration-200"
            >
              <MdAdminPanelSettings className="h-5 w-5 text-ice-surge" />
              <span className="font-medium">Admin</span>
            </div>
          </Link>
        )}

        {/* Main Navigation Items */}
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>
            <div
              onClick={() => settoggle(!toggle)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-frost-white hover:bg-ice-surge/10 border-l-4 border-transparent hover:border-ice-surge transition-all duration-200"
            >
              <span className="text-cloud-gray text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          </Link>
        ))}

        {/* Conditional Items */}
        {user && user.role === "1" && (
          <Link to="/myprojects">
            <div
              onClick={() => settoggle(!toggle)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-frost-white hover:bg-ice-surge/10 border-l-4 border-transparent hover:border-ice-surge transition-all duration-200"
            >
              <FaTachometerAlt className="h-5 w-5 text-cloud-gray" />
              <span className="font-medium">My Projects</span>
            </div>
          </Link>
        )}

        {user && (user.role === "2" || user.role === "scrummaster") && (
          <Link to="/proposals">
            <div
              onClick={() => settoggle(!toggle)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-frost-white hover:bg-ice-surge/10 border-l-4 border-transparent hover:border-ice-surge transition-all duration-200"
            >
              <FaTachometerAlt className="h-5 w-5 text-cloud-gray" />
              <span className="font-medium">Proposals</span>
            </div>
          </Link>
        )}
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-white/10"></div>

      {/* Footer Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <p className="text-xs text-cloud-gray/60 text-center">
          Winter of Code 2025
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
