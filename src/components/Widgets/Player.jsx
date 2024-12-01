import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FaPlay, FaPause } from "react-icons/fa"; // Import FontAwesome icons
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

const MusicPlayerWidget = () => {
  const theme = useSelector((state) => state.theme.mode);

  // Example lofi tracks (you can replace these with actual URLs or local file paths)
  const lofiTracks = [
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  ];

  const [currentTrack, setCurrentTrack] = useState(lofiTracks[0]);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume is 50%

  const audioRef = useRef(null);

  // Toggle play/pause
  const togglePlay = () => {
    setPlaying((prev) => !prev);
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Skip to the next track
  const skipTrack = () => {
    const nextTrack =
      lofiTracks[(lofiTracks.indexOf(currentTrack) + 1) % lofiTracks.length];
    setCurrentTrack(nextTrack);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div
      className={`widget w-64 h-48 shadow-lg rounded-lg p-4 flex flex-col gap-4 ${
        theme === "light" ? "bg-[#00000030]" : "bg-[#61546b]"
      }`}
    >
      <h2
        className={`text-xl font-bold ${
          theme === "light" ? "text-black" : "text-[#FFF9BF]"
        }`}
      >
        Lofi Music
      </h2>

      {/* Audio player without default controls */}
      <audio
        ref={audioRef}
        src={currentTrack}
        autoPlay={playing}
        volume={volume}
        className="w-full"
        loop
      />

      <div className="flex flex-col gap-4 justify-between items-center mt-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={togglePlay}
            className={`bg-[#00000030] font-semibold px-4 py-2 rounded hover:scale-110 active:scale-95 duration-200 ${
              theme === "light" ? "text-black" : "text-[#FFF9BF]"
            }`}
          >
            {playing ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>

          <button
            onClick={skipTrack}
            className={`bg-[#00000030] font-semibold px-4 py-2 rounded hover:scale-110 active:scale-95 duration-200 ${
              theme === "light" ? "text-black" : "text-[#FFF9BF]"
            } flex items-center justify-center gap-2`}
          >
            Skip{" "}
            <span>
              <GiPerspectiveDiceSixFacesRandom className="text-xl" />
            </span>
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center gap-2">
          <span
            className={`${theme === "light" ? "text-black" : "text-[#FFF9BF]"}`}
          >
            Volume
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className={`w-32 h-4 bg-gradient-to-t ${
              theme === "light"
                ? "from-[#00000030] to-[#fff9bf]"
                : "from-[#fff9bf] to-[#00000030]"
            } rounded-full appearance-none cursor-pointer transition-all duration-300`}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerWidget;
