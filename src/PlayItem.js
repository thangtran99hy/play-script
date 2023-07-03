import { useEffect, useRef, useState } from "react";
import "./App.css";
import { clear } from "@testing-library/user-event/dist/clear";
function getDurationMilliseconds(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return end.getTime() - start.getTime();
}
const PlayItem = (props) => {
    const { data, onNextVideo } = props;
    const [initTime, setInitTime] = useState(new Date());
    const [currentIndex, setCurrentIndex] = useState(null);
    const [stop, setStop] = useState(false);
    const [transcript, setTranscript] = useState(
        require("./transcripts/" + data["id"] + ".json")
    );

    useEffect(() => {
        setTimeout(() => {
            setInitTime(new Date());
        }, 1000);
    }, []);

    useEffect(() => {
        if (stop || initTime === null) {
            return;
        }
        let intervalTime = setInterval(() => {
            const now = new Date();
            const currentTime = getDurationMilliseconds(initTime, now);

            const currentTimeIndex = transcript.findIndex(
                (item) =>
                    currentTime >= item.startTime && currentTime <= item.endTime
            );
            if (currentTimeIndex !== -1) {
                const container = document.getElementById("listContainer");
                const itemRef = document.getElementById(
                    `item-[${currentTimeIndex}]`
                );

                container.scrollTop = itemRef.offsetTop - 200;

                if (currentTimeIndex === transcript.length - 1) {
                    setTimeout(() => {
                        onNextVideo();
                    }, transcript[transcript.length - 1].endTime + 5000 - currentTime);
                    setStop(true);
                }
                setCurrentIndex(currentTimeIndex);
            }
        }, 500);

        return () => {
            clearInterval(intervalTime);
        };
    }, [stop, initTime]);
    console.log("transcript", transcript);
    return (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center ">
            <div className="w-[800px] h-[800px] py-[20px] px-[40px] bg-[#20262E] flex flex-col items-center">
                <div className="text-4xl text-center font-bold text-white pt-[10px] pb-[20px]">
                    {data.title}
                </div>
                {initTime ? (
                    <div
                        id="listContainer"
                        className="flex-1 w-full overflow-auto no-scrollbar "
                    >
                        {transcript.map((item, index) => {
                            return (
                                <div
                                    id={`item-[${index}]`}
                                    className={`text-2xl my-[10px] ${
                                        currentIndex === index
                                            ? "font-bold text-[#F2921D]"
                                            : "font-thin text-white"
                                    }`}
                                >
                                    {item.text}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default PlayItem;
