import { useQuery } from "react-query";
import Axios from 'axios';
import { BallTriangle } from "react-loader-spinner";
import Doamin from './Domain';
import { useSelector, useDispatch } from "react-redux";
import { setData } from '../dataSlice';

export default function GetData({ fileName }) {

    const dispatch = useDispatch();
    const { isLoading, error, data, isFetching } = useQuery(`allData${fileName}`, () =>
        Axios.get(`http://localhost:8080/data/${fileName}`
        ).then((res) => {
            dispatch(setData(res.data))
            return res.data;
        })
            .catch((err) => {
                console.error(err)
            })
    );




    return (

        <div className="min-h-full flex items-center justify-center flex-col sm:px-6 lg:px-8">
            {
                isLoading ? (
                    <div className="flex justify-center">
                        <BallTriangle color="green" height={50} width={50} />
                    </div>
                ) :
                    Object.keys(data)?.map((key, index) =>
                        <Doamin key={index} domainName={key} times={data[key]} />
                    )
            }
            {
                error && <p> "An error has occurred: " + {error.message}</p>
            }
        </div>

    );
}

