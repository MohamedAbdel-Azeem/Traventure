import React, { useState } from 'react';
import Rating from '@mui/material/Rating';

type Activity = {
    date: string; 
    time: string; 
    location: string;
    price: string; 
    category: string; 
    tags: string[]; 
    special_discounts: string;
    status: 'open' | 'closed'; 
};

interface ActivityProp {
    activity: Activity;
    onEdit: (activity: Activity) => void;
    onDelete: (activity: Activity) => void;
}

const activityCategories = [
    { category: 'Historical', color: 'bg-green-500' },
    { category: 'Food', color: 'bg-blue-500' },
    { category: 'Recreation', color: 'bg-purple-500' },
    { category: 'Educational', color: 'bg-pink-500' },
    { category: 'Spiritual', color: 'bg-indigo-500' },
    { category: 'Labor', color: 'bg-teal-500' },
];

const ActivityCard: React.FC<ActivityProp> = ({ activity, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableActivity, setEditableActivity] = useState<Activity>(activity);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditableActivity(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onEdit(editableActivity);
        setIsEditing(false);
    };

    return ( 
        <div className="flex flex-col items-center justify-center mt-12 mx-4">
            <div className="rounded-[19px]">
                <div className="w-[352px] h-[425px] bg-[#2a7306] rounded-[19px] relative"
                    style={{
                        background: `
                            radial-gradient(ellipse at top right, #2a7306 0%, #63ea1f 76%, #00000000 100%),
                            radial-gradient(ellipse at top left, #2a7306 0%, #63ea1f 76%, #00000000 100%)
                        `,
                    }}>
                    <div className="w-[352px] h-[206px] rounded-t-[19px]">
                        <div className="absolute text-center top-0 left-0 w-[71px] h-[30px] rounded-tl-[19px] bg-[#FF0000] border-black border-[1px] rounded-br-[19px]">
                            {isEditing ? (
                                <select
                                    name="status"
                                    value={editableActivity.status}
                                    onChange={handleInputChange}
                                    className="bg-transparent text-white border-none"
                                >
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>
                            ) : (
                                editableActivity.status
                            )}
                        </div>
                        <div className="absolute text-center top-0 right-[71px] w-[71px] h-[30px] bg-[#FF0000] border-black border-[1px] rounded-bl-[19px]" onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? 'Save' : 'Edit'}
                        </div>
                        <div className="absolute text-center top-0 right-0 w-[71px] h-[30px]  bg-[#FF0000] border-black border-[1px]  rounded-tr-[19px]" onClick={() => onDelete(activity)}>
                            Delete
                        </div>
                        <img src="https://s3-eu-west-1.amazonaws.com/blog-ecotree/blog/0001/01/ad46dbb447cd0e9a6aeecd64cc2bd332b0cbcb79.jpeg"
                            alt="Activity Image"
                            className="w-full h-full object-cover rounded-t-[19px] border-black border-[1px]"/>
                    </div>
                    <div className="text-[38px] h-[45px] text-center leading-[43px]">THE GREEEEEEEN</div>
                    <div className='flex flex-row'>
                        <div className="my-auto w-[102px] h-[32px] rounded-[4px] mx-auto my-auto text-[11px] flex flex-col items-center justify-center bg-[#0000FF]">
                            {isEditing ? (
                                <input
                                    name="category"
                                    value={editableActivity.category}
                                    onChange={handleInputChange}
                                    className="bg-transparent text-white border-none"
                                />
                            ) : (
                                editableActivity.category
                            )}
                        </div>
                        <div className="ml-auto w-[232px] h-[65px] grid grid-cols-3 ">
                            {activityCategories.map(text => (
                                <div key={text.category} className={`w-[69px] h-[22px] rounded-[34px] mx-auto my-auto text-[11px] flex flex-col items-center justify-center ${text.color}`}>
                                    {text.category}
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="border-dotted border-t-2 border-gray-400" />
                    <div className="w-[352px] h-[102px] rounded-b-[19px] grid grid-cols-3">
                        <div className="border-dotted border-r-2 border-gray-400 flex flex-col">
                            {isEditing ? (
                                <>
                                    <input
                                        name="date"
                                        value={editableActivity.date}
                                        onChange={handleInputChange}
                                        className="text-center border-none bg-transparent"
                                    />
                                    <input
                                        name="time"
                                        value={editableActivity.time}
                                        onChange={handleInputChange}
                                        className="text-center border-none bg-transparent"
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col items-center justify-start text-[13px] mt-auto">{editableActivity.date}</div>
                                    <div className="flex flex-col items-center justify-end text-[13px] mb-auto">{editableActivity.time}</div>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col items-center justify-center text-[13px] border-dotted border-r-2 border-gray-400">
                            {isEditing ? (
                                <input
                                    name="price"
                                    value={editableActivity.price}
                                    onChange={handleInputChange}
                                    className="text-center border-none bg-transparent"
                                />
                            ) : (
                                editableActivity.price
                            )}
                        </div>
                        <div className="flex flex-col items-center justify-center text-[13px]">
                            {isEditing ? (
                                <input
                                    name="location"
                                    value={editableActivity.location}
                                    onChange={handleInputChange}
                                    className="text-center border-none bg-transparent"
                                />
                            ) : (
                                editableActivity.location
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActivityCard;
