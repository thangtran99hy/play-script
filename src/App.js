import React, { useEffect, useState } from "react";
import PlayItem from "./PlayItem";
const LEVEL = 1;
const App = (props) => {
    const [videos, setVideos] = useState(() => {
        const data = require("./videos.json");
        return data.filter((item) => item.level === LEVEL);
    });
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setCurrentIndex(0);
        }, 5000);
    }, []);
    if (currentIndex === null) return;
    return (
        <PlayItem
            data={videos[currentIndex]}
            onNextVideo={() => {
                let currentIndexTemp = currentIndex;
                setCurrentIndex(null);
                setTimeout(() => {
                    setCurrentIndex(currentIndexTemp + 1);
                }, 2000);
            }}
        />
    );
};

export default App;
