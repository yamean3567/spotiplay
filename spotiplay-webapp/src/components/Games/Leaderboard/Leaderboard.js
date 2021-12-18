import { useState, useEffect } from "react";

const useWindowWide = (size) => {
    const [width, setWidth] = useState(0)
    
    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth)
      }
      
      window.addEventListener("resize", handleResize)
      handleResize()
      return () => { 
          window.removeEventListener("resize", handleResize)
      }
    }, [setWidth])
    
    return width > size
  }

const getName = (email) => {
    return email.substring(0, email.lastIndexOf("@"));
}

const DisplayLeaderboard = (props) => {
    const [activeTab, setActiveTab] = useState("Tab 1");
    const wide = useWindowWide(850)

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
            <img className={wide ? "fixed bottom-0 right-10 w-1/6 ..." : "fixed invisible"} alt="Snoop Dogg" src="https://i.gifer.com/X11G.gif"/>
            <img className={wide ? "fixed bottom-0 left-0 w-1/4 ..." : "fixed invisible"} alt="Notorious B.I.G" src="https://www.pikpng.com/pngl/b/188-1882327_biggie-smalls-png-clipart.png"/>
            {/*DONT CLICK THIS LINK: "https://i.imgur.com/kQySfCM.gif" */}
              <div id="tab-contents">
                <div id="first" className={activeTab === "Tab 1" ? "p-4" : "hidden p-4"}>
                    {props.leadersLG.map((data, i) => (
                        <div key={data.email} className="mt-6">
                            <div key={i} className={i === 0 ? "bg-yellow-300" : "text-white"}>
                                {i+1}. {getName(data.email)}
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
                                {i+1}. {getName(data.email)}
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
