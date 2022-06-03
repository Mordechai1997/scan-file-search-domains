import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import Axios from 'axios';
import Doamin from './Domain';
import { setName } from '../dataSlice';
import { useSelector, useDispatch } from "react-redux";
import GetData from './GetData';

export default function AllData() {

    const dispatch = useDispatch();
    const fileName = useSelector((state) => state.dataDomains.data.name);
    const data = useSelector((state) => state.dataDomains.data.domains);

    const [message, setMessage] = useState('');
    const [domain, setDomain] = useState('');
    const [list, setList] = useState([]);
    const [num, setNum] = useState('');
    const [allFilesName, setAllFilesName] = useState('');
   
    useEffect(() => {
        Axios.get(`http://localhost:8080/files`
        ).then((res) => setAllFilesName(res.data))
            .catch((err) => {
                console.error(err)
                setMessage('Something is wrong Try again')
            })
    }, [])


    const search = (e, type) => {
        e.preventDefault();
        setMessage('');
        if(!fileName){
            return;
        }
        const asArray = Object.entries(data);
        if (type === 'min') {
            setList(() => asArray.filter(([key, value]) => value >= num))
            setDomain('')
        } else {
            setList(() => asArray.filter(([key, value]) => key.includes(domain)))
            setNum('')
        }
        if (!list[0] ) {
            setMessage('not found');
        }
    }


    return (
        <>
            <form className="min-h-full flex items-center justify-center flex-col py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center border-b border-green-500 py-2 mb-5">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Domain name"
                        aria-label="Full name"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value.trim())}

                    />
                    <button
                        className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={(e) => search(e, 'domain')}

                    >
                        Search
                    </button>
                </div>
                <div className="flex items-center border-b border-green-500 py-2">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="number"
                        placeholder="Min number repet"
                        min={0}
                        aria-label="Full name"
                        value={num}
                        onChange={(e) => setNum(e.target.value)}
                    />
                    <button
                        className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={(e) => search(e, 'min')}
                    >
                        Search
                    </button>
                </div>
                <div className="w-64 flex items-center border-b border-green-500 py-2">
                    <select
                        onChange={(e) => dispatch(setName(e.target.value))}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                        <option defaultValue className='text-gray-300'>Files</option>
                        {
                            allFilesName && allFilesName.map((name, index) =>
                                <option key={index}>{name}</option>

                            )
                        }
                    </select>
                </div>
            </form>
            {
                <div className="min-h-full flex items-center justify-center flex-col sm:px-6 lg:px-8">
                    {
                        list[0] ? list.map((arr, index) =>
                            <Doamin key={index} domainName={arr[0]} times={arr[1]} />
                        ) : message ? (
                            <p className="py-2 text-s italic">
                                {message}
                                <span
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() => setMessage('')}
                                >
                                    {' '}all domains
                                </span>
                            </p>
                        ) :<>{fileName && <GetData fileName={fileName}/>}</>
                           
                    }
                </div>
            }
        </>
    );
}

