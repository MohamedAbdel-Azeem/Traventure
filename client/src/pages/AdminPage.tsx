import Navbar from "../components/Navbar";
import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook,faPeopleGroup } from '@fortawesome/free-solid-svg-icons';  // Import the Font Awesome icon you need
import Dashboard from "../components/Admin/Dashboard";
import ActiveStudents from "../components/Admin/ActiveStudents";
import InactiveStudents from "../components/Admin/InactiveStudents";
import Materials from "../components/Admin/Materials"

const AdminPage = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const sideBarData = [
        {
            title: "Activities",
            icon: <FontAwesomeIcon icon={faPeopleGroup} />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            // content: <Reports />
        },
        {
            title: "Users",
            icon: <IoPersonSharp />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: "Accepted Users",
                    content: <ActiveStudents/>,
                    icon: <IoIcons.IoIosPaper />,
                    // data: RegDonorData
                },
                {
                    title: "Pending Users",
                    content: <InactiveStudents/>,
                    icon: <IoIcons.IoIosPaper />,
                    // data: PendingDonorData
                },
            ],
        },
        {
            title: "Shop",
            icon: <AiIcons.AiFillHome />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            content: <Dashboard />,
        },
        {
            title: "Places",
            icon: <FontAwesomeIcon icon={faBook} /> ,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            content: <Materials/>
        },
    ];

    const [content, setContent] = useState(<Dashboard/>);

    const sideBarFunction = (value) => {
        setContent(value.content);
    };

    return (
        <div>
            <Navbar
                sideBarFlag={true}
                isSideBarOpen={isSideBarOpen}
                showSideBar={() => setIsSideBarOpen(!isSideBarOpen)}
                sideBarData={sideBarData}
                sideBarFunction={sideBarFunction}
            />
            <div
                style={{
                    margin: `20px 20px 20px ${isSideBarOpen ? "270px" : "20px"}`,
                    transition: "200ms",
                }}
            >
                {content}
            </div>
        </div>
    );
};

export default AdminPage;
