import AllData from './AllData'

function Doamin({ domainName, times }) {
    return (
        <p className='mt-3'>Domain <span className='py-2 font-bold text-s italic'>{domainName}</span> has been found <span className='py-2 font-bold text-s italic'>{times}</span> times</p>
    );
}

export default Doamin;
