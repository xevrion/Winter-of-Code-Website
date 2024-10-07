import {   TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Mentor } from "../types/mentor";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { togglestate } from "../store/toggle";

const ProjectForm=()=>{
    const toggle = useRecoilValue(togglestate);
    const [mentors, setmentors] = useState<Mentor[]>();
    const [name,setname] = useState("");
    const [tag,settag] = useState("");
    const [description,setdescription] = useState("");
    const [mentor,setmentor] = useState("");
    const [mentorid,setmentorid]=useState("");
    const [year,setyear]=useState("");
    const [technology,settechnology] = useState("");
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const addproject = async () => {
      try {
        const projectData = {
          title: name,
          tag,
          description,
          mentor,
          technology,
          mentorid,
          year
        };
        const token = localStorage.getItem("jwt_token");
        const resp = await axios.post(`${BASE_URL}/project`, projectData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (resp.data.success) {
          alert("Project added successfully");
        } else {
          alert("Failed to add Project");
        }
      } catch (error) {
        console.error("Error adding project:", error);
        alert("An error occurred while adding the project");
      }
    };
    useEffect(() => {
      const getmentors = async () => {
        const resp = await axios.get(`${BASE_URL}/allmentors`);
        console.log(resp);
        setmentors(resp.data);
      };
      getmentors();
    }, [BASE_URL]);
return(
    <div className={`flex justify-center w-screen h-screen bg-slate-100  ${toggle === null ? "" : toggle ? "contract" : "expand"}`}>
    <div className="flex  flex-col item-center justify center  mt-[130px] bg-white w-[400px] h-screen m-10 p-5 ">
          <div className="flex justify-center text-blue-600 text-[30px]">Add Project</div>
          <TextField className="m-[5px]" id="outlined-basic" onChange={(e)=>setname(e.target.value)}   label="Name" variant="outlined" />
          <TextField id="outlined-basic" onChange={(e)=>settag(e.target.value)}   margin="normal"  label="Tag" variant="outlined" />
          <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          onChange={(e)=>setdescription(e.target.value)} 
          rows={4}
          defaultValue=""
        />
         
          <TextField id="outlined-basic" onChange={(e)=>settechnology(e.target.value)}   margin="normal"  label="Technologies" variant="outlined" />
          <select
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
  value={mentor}
  onChange={(e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedMentorName = selectedOption.value;
    const selectedMentorId = selectedOption.getAttribute('data-id');
    setmentor(selectedMentorName);
    if(typeof selectedMentorId==="string")
    setmentorid(selectedMentorId);
  }}
>
  <option value="">Mentors</option>
  {mentors?.map((x: Mentor) => {
    return (
      <option key={x.id} value={`${x.first_name} ${x.last_name}`} data-id={x.id}>
        {x.first_name} {x.last_name}
      </option>
    );
  })}
</select>
<TextField id="outlined-basic" onChange={(e)=>setyear(e.target.value)}   margin="normal"  label="Year" variant="outlined" />
          <button className="my-3 bg-blue-500 rounded-md text-white hover:bg-blue-600 p-2 " onClick={addproject}>Submit</button>

    </div>
    </div>
)
}
export default ProjectForm