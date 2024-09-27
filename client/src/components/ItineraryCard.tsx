import React from 'react'
const ItineraryCard: React.FC = () => {
    return ( 
        <div className="flex flex-col items-center justify-center mt-12">

<div className="w-[352px] h-[425px] bg-slate-600 rounded-[19px]">
            <div className="w-[352px] h-[208px] bg-slate-200 rounded-t-[19px]">
            <img src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" alt="Itinerary Image" className="w-[352px] h-[208px] bg-slate-200 rounded-t-[19px]" />
        </div>
        <p className="text-[38px]">THE GREEEEEEEEEEN</p>
        <p className="text-[18px]">Are you tired of being robbed in First World Countries? Come try the same experience but in Egypt!</p>
        <div className="w-[352px] h-[52px] grid grid-cols-4">
        <div className="w-[82px] h-[22px] rounded-[34px]  bg-slate-100 text-[11px] flex flex-col items-center justify-center">Prostitution</div>
        <div className="w-[82px] h-[22px] rounded-[34px]  bg-slate-100 text-[11px] flex flex-col items-center justify-center">Spanish</div>
        <div className="w-[82px] h-[22px] rounded-[34px]  bg-slate-100 text-[11px] flex flex-col items-center justify-center">Historical</div>
        <div className="w-[82px] h-[22px] rounded-[34px]  bg-slate-100 text-[11px] flex flex-col items-center justify-center">Food</div>
        <div className="w-[82px] h-[22px] rounded-[34px]  bg-slate-100 text-[11px] flex flex-col items-center justify-center">Recreation</div>
        <div className="w-[82px] h-[22px] rounded-[34px]  bg-slate-100 text-[11px] flex flex-col items-center justify-center">Educational</div>
        <div className="w-[82px] h-[22px] rounded-[34px]  bg-slate-100 text-[11px] flex flex-col items-center justify-center">Spiritual</div>
        <div className="w-[82px] h-[22px] rounded-[34px]  bg-slate-100 text-[11px] flex flex-col items-center justify-center">Prostitution</div>
        </div>
        <hr/>
        <div className="w-[352px] h-[47px] rounded-b-[19px] bg-slate-100 grid grid-cols-3">
            <div className="border-r">
                <div className="flex flex-col items-start justify-start text-[13px] ml-2">19/02/2025</div>
                <div className="flex flex-col items-end justify-end text-[13px] mr-2">08/05/2026</div>
            </div>
            <div className="flex flex-col items-center justify-center text-[13px]  border-r">$100,000,000</div>
        <div className="flex flex-col items-center justify-center text-[13px]">90%</div>
        </div>
        </div>
            
        </div>
        
     );
}
 
export default ItineraryCard;