import React, { useRef, useState } from "react";
import { Slider, Switch, Button } from "antd";

const AudioPlayer = ({ url }) => {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1.0);
    const [loop, setLoop] = useState(false);

    const togglePlay = () => {
        const audio = audioRef.current;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleSpeedChange = (value) => {
        setSpeed(value);
        audioRef.current.playbackRate = value;
    };

    const handleLoopChange = (checked) => {
        setLoop(checked);
        audioRef.current.loop = checked;
    };

    return (
        <div className="flex flex-col items-center">
            <audio ref={audioRef} src={url} preload="auto" loop={loop}></audio>

            <Button
                type={isPlaying ? "danger" : "primary"}
                onClick={togglePlay}
                className="my-4"
            >
                {isPlaying ? "Pause" : "Play"}
            </Button>

            <div className="speed-control">
                <span className="font-bold">Speed:</span>
                <Slider
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={speed}
                    onChange={handleSpeedChange}
                    className="slider"
                />
                <span className="speed-label">{speed}x</span>
            </div>

            <div className="loop-control">
                <span className="font-bold">Loop:</span>
                <Switch checked={loop} onChange={handleLoopChange} />
            </div>
        </div>
    );
};

export default AudioPlayer;
