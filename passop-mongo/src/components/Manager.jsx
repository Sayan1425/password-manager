import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    getpass();
  }, []);

  const getpass = async () => {
    try {
      let req = await fetch("http://localhost:3000/");
      let passwords = await req.json();
      setpasswordArray(passwords);
    } catch (error) {
      console.error("Failed to fetch passwords", error);
    }
  };

  const showPass = () => {
    if (ref.current.src.includes("eyecross.png")) {
      ref.current.src = "/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePass = async () => {
    const { site, username, password } = form;
    if (site.trim().length > 3 && username.trim().length > 3 && password.trim().length > 3) {
      // Optional: Remove old entry if editing
      if (form.id) {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id })
        });
      }

      const newPass = { ...form, id: uuidv4() };
      setpasswordArray([...passwordArray, newPass]);

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPass)
      });

      toast('Password saved!', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce
      });

      setform({ site: "", username: "", password: "" });
    } else {
      toast('All fields must be at least 4 characters long!', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce
      });
    }
  };

  const editPass = (id) => {
    const item = passwordArray.find(p => p.id === id);
    setform(item);
    setpasswordArray(passwordArray.filter(p => p.id !== id));
  };

  const deletePass = async (id) => {
    const confirmed = window.confirm("Do you want to delete this password?");
    if (confirmed) {
      setpasswordArray(passwordArray.filter(item => item.id !== id));
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });

      toast('Password deleted!', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce
      });
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className="md:mycontainer p-2 min-h-[88vh]">
        <div className="flex flex-col items-center">
          <h1 className="text text-4xl font-bold text-center">
            <span className="text-green-500">&lt;</span>
            <span>Pass</span>
            <span className="text-green-500">Op/&gt;</span>
          </h1>
          <p className="text-green-700 text-lg">Your own Password Manager</p>
        </div>

        <div className="flex flex-col items-center p-4 gap-6 text-black">
          <input onChange={handleChange} value={form.site} placeholder="Enter Website URL" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name="site" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-6">
            <input onChange={handleChange} value={form.username} placeholder="Enter Username" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name="username" />
            <div className="relative">
              <input ref={passwordRef} onChange={handleChange} value={form.password} placeholder="Enter Password" className="rounded-full border border-green-500 w-full p-4 py-1" type="password" name="password" />
              <span className="absolute right-[4px] top-[4px] cursor-pointer" onClick={showPass}>
                <img ref={ref} src="/eye.png" alt="eye" width={25} className="p-1" />
              </span>
            </div>
          </div>

          <button onClick={savePass} className="flex justify-center items-center bg-green-500 rounded-full px-8 py-2 w-fit hover:bg-green-300 gap-2 border-2 border-green-600">
            <lord-icon src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover"></lord-icon>
            Save
          </button>
        </div>

        <div className="passTable">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>No password to show</div>
          ) : (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-500 text-black">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-white py-2 text-center">
                      <div className="flex items-center justify-center">
                        <a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a>
                        <div className="cursor-pointer size-7 lordiconcopy" onClick={() => copyText(item.site)}>
                          <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" trigger="hover" style={{ width: "20px", height: "20px", paddingTop: "3px", paddingLeft: "3px" }}></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="border border-white py-2 text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.username}</span>
                        <div className="cursor-pointer size-7 lordiconcopy" onClick={() => copyText(item.username)}>
                          <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" trigger="hover" style={{ width: "20px", height: "20px", paddingTop: "3px", paddingLeft: "3px" }}></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="border border-white py-2 text-center">
                      <div className="flex items-center justify-center">
                        <span>{"*".repeat(item.password.length)}</span>
                        <div className="cursor-pointer size-7 lordiconcopy" onClick={() => copyText(item.password)}>
                          <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" trigger="hover" style={{ width: "20px", height: "20px", paddingTop: "3px", paddingLeft: "3px" }}></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="justify-center py-2 border border-white text-center">
                      <span className="cursor-pointer mx-1" onClick={() => editPass(item.id)}>
                        <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                      </span>
                      <span className="cursor-pointer mx-1" onClick={() => deletePass(item.id)}>
                        <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
