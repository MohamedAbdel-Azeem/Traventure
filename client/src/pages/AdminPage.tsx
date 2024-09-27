import Navbar from "../components/Navbar";
import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook,faVideo,faChartSimple,faPhone,faEnvelope,faPeopleGroup } from '@fortawesome/free-solid-svg-icons';  // Import the Font Awesome icon you need
import Dashboard from "../components/Admin/Dashboard";
import ActiveStudents from "../components/Admin/ActiveStudents";
import InactiveStudents from "../components/Admin/InactiveStudents";
import Materials from "../components/Admin/Materials"
import Videos from "../components/Admin/Videos"
import Submissions from "../components/Admin/Submissions"
import Reports from "../components/Admin/Reports"

const AdminPage = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const sideBarData = [
        {
            title: "Home",
            icon: <AiIcons.AiFillHome />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            content: <Dashboard />,
        },
        {
            title: "Students",
            icon: <IoPersonSharp />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: "Active Students",
                    content: <ActiveStudents/>,
                    icon: <IoIcons.IoIosPaper />,
                    // data: RegDonorData
                },
                {
                    title: "Inactive Students",
                    content: <InactiveStudents/>,
                    icon: <IoIcons.IoIosPaper />,
                    // data: PendingDonorData
                },
            ],
        },
        {
            title: "Materials",
            icon: <FontAwesomeIcon icon={faBook} /> ,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            content: <Materials/>
        },
        {
            title: "Videos",
            icon: <FontAwesomeIcon icon={faVideo} />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            content: <Videos/>
        },
        {
            title: "Submissions",
            icon: <FontAwesomeIcon icon={faEnvelope} />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            content: <Submissions />
        },
       
        {
            title: "Assistants",
            icon: <FontAwesomeIcon icon={faPeopleGroup} />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            // content: <Reports />
        },
        {
            title: "Calls",
            icon: <FontAwesomeIcon icon={faPhone} />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            // content: <Reports />
        },
        {
            title: "Reports",
            icon: <FontAwesomeIcon icon={faChartSimple} />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            content: <Reports />
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
