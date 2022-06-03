import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { setData, setName } from "../dataSlice";


export default function Form() {

    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('*The form must be complited!')
            return;
        } else {
            dispatch(setName(fileName))
            const data = new FormData();
            data.append('file', file);
            const response = await fetch('http://localhost:8080/', {
                method: 'POST',
                body: data
            }).then((res) => console.log(res))
                .catch((err) => {
                    console.log(err)
                    setMessage('Something is wrong Try again')
                    return;
                })
        }


        setTimeout(() => {
            navigate('/data')
        }, 100)
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" >
            <div className="rounded p-8 shadow">
                <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px ">
                        <div className="flex justify-center">
                            <div className="mb-3 w-96">
                                <label htmlFor="formFile"
                                    className="form-label inline-block mb-2 text-gray-700">
                                    Upload file
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    className="form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="formFile"
                                    onChange={saveFile} />
                            </div>
                        </div>
                        {message && <p className="py-2 text-red-500 text-s italic">{message}</p>}
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center
                                       py-2 px-4 border border-transparent text-sm font-medium
                                       rounded-md text-white bg-green-600 hover:bg-green-700
                                       focus:outline-none focus:ring-2 focus:ring-offset-2
                                       focus:ring-green-500 "
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faSquarePlus} className="h-5 w-5 text-green-500 group-hover:text-green-400"
                                    aria-hidden="true" />
                            </span>
                            Scan
                        </button>
                        <p className=' py-2 text-blue-500 cursor-pointer' onClick={()=> navigate('/data')}>Search existing files</p>
                    </div>
                </form>
            </div>
        </div>
    )
}