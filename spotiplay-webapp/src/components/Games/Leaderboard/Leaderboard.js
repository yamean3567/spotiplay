import { useState } from "react";

const DisplayLeaderboard = (props) => {
    const [activeTab, setActiveTab] = useState("Tab 1");

    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        setActiveTab(newActiveTab);
    };
    return (
        <div className="grid place-items-center">
            <ul id="tabs" className="flex cursor-pointer">
                <li className={activeTab === "Tab 1" ? "py-2 px-6 bg-green-400 rounded-t-lg text-black" : "py-2 px-6 bg-white rounded-t-lg text-gray-500 bg-gray-200"} onClick={e => handleClick(e, "Tab 1")}><a href="#tab1" key={"tab1"}>Guess the lyrics</a></li>
                <li className={activeTab === "Tab 2" ? "py-2 px-6 bg-green-400 rounded-t-lg text-black" : "py-2 px-6 bg-white rounded-t-lg text-gray-500 bg-gray-200"} onClick={e => handleClick(e, "Tab 2")}><a href="#tab2" key={"tab2"}>Higher or Lower</a></li>
            </ul>
            <div id="tab-contents">
                <div id="first" className={activeTab === "Tab 1" ? "p-4" : "hidden p-4"}>
                    {props.leadersLG.map((data, i) => (
                        <div key={data.email} className="mt-6">
                            <div key={i} className={i === 0 ? "bg-yellow-300" : "text-white"}>
                                {i+1}. {data.email}
                            </div>
                            <div className="text-white">
                                Score: {data.LGScore}
                            </div>
                        </div>
                    ))}
                </div>
                <div id="second" className={activeTab === "Tab 2" ? "p-4" : "hidden p-4"}>
                    {props.leadersHL.map((data, i) => (
                        <div key={data.email} className="mt-6">
                            <div key={i} className={i === 0 ? "bg-yellow-300" : "text-white"}>
                                {i+1}. {data.email}
                            </div>
                            <div className="text-white">
                                Score: {data.HLScore}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DisplayLeaderboard
