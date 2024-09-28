import React from 'react';
import Rating from '@mui/material/Rating';
const ItineraryCard: React.FC = () => {

    const activityCategories = [
        { category: 'Dig out', color: 'bg-red-500' },
        { category: 'Spanish', color: 'bg-yellow-500' },
        { category: 'Historical', color: 'bg-green-500' },
        { category: 'Food', color: 'bg-blue-500' },
        { category: 'Recreation', color: 'bg-purple-500' },
        { category: 'Educational', color: 'bg-pink-500' },
        { category: 'Spiritual', color: 'bg-indigo-500' },
        { category: 'Labor', color: 'bg-teal-500' },
      ];

    return ( 
        <div className="flex flex-col items-center justify-center mt-12">
            <div className="rounded-[19px]">
            <div className="w-[352px] h-[425px] bg-[#2a7306] rounded-[19px]"
            style={{
                background: `
                  radial-gradient(ellipse at top right, #2a7306 0%, #63ea1f 76%, #00000000 100%),
                  radial-gradient(ellipse at top left, #2a7306 0%, #63ea1f 76%, #00000000 100%)
                `,
              }}>
            <div className="w-[352px] h-[206px] rounded-t-[19px]">
                <img src="https://s3-eu-west-1.amazonaws.com/blog-ecotree/blog/0001/01/ad46dbb447cd0e9a6aeecd64cc2bd332b0cbcb79.jpeg"
                    alt="Itinerary Image"
                    className="w-full h-full object-cover rounded-t-[19px] border-black border-[1px]"/>
            </div>
        <div className="text-[38px] h-[45px] text-center leading-[43px]">THE GREEEEEEEN</div>
        <div className="text-[18px] h-[66px] text-center leading-[20px]">Are you tired of being robbed in First World Countries? Come try the same experience but in Egypt!</div>
        <div className="w-[352px] h-[60px] grid grid-cols-4 ">
        {activityCategories.map(text => (
            <div className={`w-[82px] h-[22px] rounded-[34px] mx-auto my-auto text-[11px] flex flex-col items-center justify-center ${text.color}`}>
                {text.category}
            </div>
            ))}
        </div>
        <hr className="border-dotted border-t-2 border-gray-400" />
        <div className="w-[352px] h-[46px] rounded-b-[19px] grid grid-cols-3"
        style={{
            background: `
                radial-gradient(ellipse at bottom left, #2a7306 0%, #00000000 30%),
                radial-gradient(ellipse at bottom right, #2a7306 0%, #00000000 30%),
                radial-gradient(ellipse at bottom , #2a7306 0%, #00000000 30%)
            `,
          }}>
            <div className="border-dotted border-r-2 border-gray-400">
                <div className="flex flex-col items-start justify-start text-[13px] ml-2 mt-1">19/02/2025</div>
                <div className="flex flex-col items-end justify-end text-[13px] mr-2 mb-1">08/05/2026</div>
            </div>
            <div className="flex flex-col items-center justify-center text-[13px] border-dotted border-r-2 border-gray-400">$100,000,000</div>
        <div className="flex flex-col items-center justify-center text-[13px]"><Rating name="half-rating" value={3.75} precision={0.01} readOnly/></div>
        </div>
        </div>
            </div>
        </div>
        
     );
}
 
export default ItineraryCard;