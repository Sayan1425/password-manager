import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })

    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPass = () => {
        if (ref.current.src.includes("/eyecross.png")) {
            ref.current.src = "eye.png"
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    const savePass = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPass = { ...form, id: uuidv4() };
            const newPasswordArray = [...passwordArray, newPass];
            setpasswordArray(newPasswordArray)
            localStorage.setItem("passwords", JSON.stringify(newPasswordArray))
            setform({ site: "", username: "", password: "" })

            toast('Password saved!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce
            });
        } else {
            toast('Something wrong in site or username or password', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce
            });
        }
    }

    const editPass = (id) => {
        setform(passwordArray.find(item => item.id === id))
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const deletePass = (id) => {
        let c = confirm("Do you want to delete this password ?");
        if (c) {
            const newArray = passwordArray.filter(item => item.id !== id)
            setpasswordArray(newArray)
            localStorage.setItem("passwords", JSON.stringify(newArray))
            toast('Password is deleted.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce
            });
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer theme="light" transition={Bounce} />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
            </div>

            <div className="md:mycontainer md:p-0 p-2 min-h-[88.2vh] pt-3">
               <div className='flex flex-col justify-center items-center'> 
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl font-bold text-center'>
                        <span className=' text-green-500'>&lt;</span>
                        <span>Pass</span>
                        <span className=' text-green-500'>Op/&gt;</span>
                    </h1>
                    <p className='text-green-700 text-lg'>Your own PassWord Manager</p>
                </div>
                </div>

                <div className="flex flex-col items-center p-4 gap-3">
                    <input onChange={handleChange} value={form.site} placeholder='Enter Website URL'
                        className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />

                    <div className='flex flex-col md:flex-row w-full justify-between gap-3'>
                        <input onChange={handleChange} value={form.username} placeholder='Enter Username'
                            className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />

                        <div className='relative'>
                            <input ref={passwordRef} onChange={handleChange} value={form.password} placeholder='Enter Password'
                                className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-[8px] top-[4px] cursor-pointer' onClick={showPass}>
                                <img ref={ref} src="/eye.png" alt="eye" width={25} className='p-1' />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePass} className='flex justify-center items-center bg-green-500 rounded-full px-4 py-2 w-fit text-black hover:bg-green-300 gap-2 border-2 border-green-600'>
                        <lord-icon src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover"></lord-icon>
                        Save
                    </button>
                </div>

                <div className="passTable">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No password to show</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-500 text-black'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='border border-white py-2 text-center'>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank' rel="noreferrer">{item.site}</a>
                                                <div className='cursor-pointer size-7 lordiconcopy' onClick={() => copyText(item.site)}>
                                                    <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" trigger="hover"
                                                        style={{ width: "20px", height: "20px", paddingTop: "3px", paddingLeft: "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border border-white py-2 text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className='cursor-pointer size-7 lordiconcopy' onClick={() => copyText(item.username)}>
                                                    <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" trigger="hover"
                                                        style={{ width: "20px", height: "20px", paddingTop: "3px", paddingLeft: "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border border-white py-2 text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.password}</span>
                                                <div className='cursor-pointer size-7 lordiconcopy' onClick={() => copyText(item.password)}>
                                                    <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" trigger="hover"
                                                        style={{ width: "20px", height: "20px", paddingTop: "3px", paddingLeft: "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='justify-center py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => editPass(item.id)}>
                                                <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => deletePass(item.id)}>
                                                <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager;
