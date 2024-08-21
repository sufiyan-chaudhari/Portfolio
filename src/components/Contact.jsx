import React, { useContext, useState } from "react";
import { contactLinks } from "../constants";
import { ThemeContext } from "../themeProvider";
import toast from "react-hot-toast";

const Contact = () => {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzAIh5T0aBPrTwpkL4RX971HtMpjb7GTWZ6nTBzjFhNiygJtKgNki2kHLgbo-o_60g/exec";
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData),
    })
      .then(() => {
        toast.success("Message sent successfully");
        setFormData({
          Name: "",
          Email: "",
          Message: "",
        });
      })
      .catch((error) => {
        console.error("Error!", error.message);
        toast.error("An error occurred. Please try again later.");
      })
      .finally(() => setLoading(false));
  };
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div
      id="contact"
      className={
        darkMode
          ? "bg-gray-100 pt-24 md:=h-screen"
          : "bg-black pt-24 text-white md:=h-screen"
      }
    >
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 px-4 ">
        <h2 className="text-5xl font-bold px-4 md:px-0 text-center z-0">
          Contact
        </h2>
        <div>
          <h4 className="mt-12 text-3xl font-semibold text-blue-500">
            Connect with me
          </h4>
          <p className="text-gray-500 text-xl">
            If you want to know more about me or my work, or if you would just
            <br />
            like to say hello, send me a message. I'd love to hear from you.
          </p>
        </div>
        <div className="flex justify-between items-center md:items-stretch  flex-col md:flex-row pb-24">
          <div className="w-full md:pr-8">
            <form name="submit-to-google-sheet" onSubmit={handleSubmit}>
              <div class="my-6">
                <label
                  htmlFor="name"
                  class={
                    darkMode
                      ? "block mb-2 text-lg font-medium text-gray-900"
                      : "block mb-2 text-lg font-medium text-white"
                  }
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  class={
                    darkMode
                      ? "block mb-2 text-lg font-medium text-gray-900"
                      : "block mb-2 text-lg font-medium text-white"
                  }
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  class={
                    darkMode
                      ? "block mb-2 text-lg font-medium text-gray-900"
                      : "block mb-2 text-lg font-medium text-white"
                  }
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="Message"
                  required
                  value={formData.Message}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 h-28 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your message"
                />
              </div>
              <div className="flex justify-between ">
                <div className="underline">
                  <a href="mailto:msufiyanhusen@gmail.com">
                    Send me email directly
                  </a>
                </div>
                <button
                  className="bg-indigo-500 text-white px-4 py-2 w-40 rounded-md hover:bg-indigo-400"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
          <div className="w-full flex flex-col md:items-end  mt-12 md:mt-6">
            <h1 className="text-3xl font-bold">Phone</h1>
            <a
              href="hello"
              className="mb-12 mt-4 font-semibold text-blue-700 block uppercase"
            >
              +91 8767251729
            </a>
            <h1 className="text-3xl font-bold">Email</h1>
            <a
              href="mailto:msufiyanhusen@gmail.com"
              className="mb-12 mt-4 font-semibold text-blue-700 block "
            >
              msufiyanhusen@gmail.com
            </a>

            <h1 className="text-3xl  font-bold">Social</h1>
            <ul className="flex">
              {contactLinks.map((el) => (
                <a
                  href={el.link}
                  className="md:ml-6 md:mr-0 mr-6 cursor-pointer mt-4 hover:scale-125 flex flex-col justify-center items-center"
                >
                  <img alt="" src={el.url} />
                  <p className="text-md mt-2 hover:hidden">{el.name}</p>
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={
          darkMode
            ? "w-full bg-white text-black text-lg py-3 flex justify-center "
            : "w-full bg-gray-900 text-white text-lg py-3 flex justify-center "
        }
      >
        Made with
        <div className="text-red-500 px-2 text-2xl">&#10084;</div>
        by Sufiyan Chaudhari
      </div>
    </div>
  );
};

export default Contact;
