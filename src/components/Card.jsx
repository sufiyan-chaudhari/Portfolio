import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ThemeContext } from "../themeProvider";
import axios from "axios";

const Card = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  //
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(projects);
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://next-auth-by-sufiyan.vercel.app/api/projects"
        );
        setProjects(response.data.projects);
      } catch (error) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  //

  return (
    <>
      {loading ? (
        <div className="pl-[50%] flex justify-center items-center  py-24">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 "></div>
        </div>
      ) : (
        <motion.div
          initial={"hidden"}
          whileInView={"visible"}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          class="w-full m-4 grid gap-8 sm:grid-cols-12"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`min-h-[250px]   rounded-lg shadow-2xl lg:col-span-4 sm:col-span-6 ${
                darkMode ? " border  " : "bg-[#1a1a2e] border border-black "
              }`}
            >
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="rounded-lg w-full h-48 p-1 object-cover "
                  src={project.imageSrc}
                  alt={project.name}
                />
              </a>
              {/*  */}
              <div className="flex flex-wrap py-2">
                {project.lang.split(" ").map((language, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`border dark:border-blue-500 inline-flex items-center mt-2 ml-2 px-2 py-1 font-bold text-center text-blue-500 rounded-[50px] bg-gray-700 text-[12px]  ${
                      darkMode ? " bg-slate-50" : ""
                    }`}
                  >
                    {language.toUpperCase()}
                  </a>
                ))}
              </div>
              {/*  */}
              <div className="p-5">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-blue-500">
                    {project.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {project.description}
                </p>
                <div className="flex">
                  <a
                    href={project.githubLink}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-[50px] bg-gray-700 hover:bg-gray-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="mr-2 text-white-500" />
                    Github
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      className="inline-flex ml-4 items-center px-3 py-2 text-sm font-medium text-center text-white rounded-[50px] bg-blue-700 hover:bg-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Project{" "}
                      <MdOutlineArrowOutward className="ml-1" size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default Card;
