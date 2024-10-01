"use client";
import React, { useLayoutEffect, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

type AudioPlayerProps = {
  audioSrc: string;
  movieTitle: string;
  movieDirector: string;
  movieImage: string;
};

function AudioPlayerComponent({
  audioSrc,
  movieTitle,
  movieDirector,
  movieImage,
}: AudioPlayerProps) {
  const [showPlayer, setShowPlayer] = useState(false);

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    const audioContainer = document.querySelector(".rhap_container");
    const elem1 = document.querySelectorAll(".rhap_time");
    const elem2 = document.querySelector(".rhap_progress-indicator");
    const elem3 = document.querySelector(".rhap_progress-filled");
    const elem4 = document.querySelectorAll(".rhap_main-controls-button");
    if (audioContainer) {
      (audioContainer as HTMLElement).style.background = "none";
      elem1.forEach((el) => {
        (el as HTMLElement).style.color = "#fff";
      });
      (elem2 as HTMLElement).style.backgroundColor = "orange";
      (elem3 as HTMLElement).style.backgroundColor = "orange";
      elem4.forEach((el) => {
        (el as HTMLElement).style.color = "#fff";
      });
    }
    setShowPlayer(true);
  });

  return (
    <>
      {showPlayer && (
        <div className="absolute bottom-0 left-0 w-full z-50">
          <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 p-4">
            <div className="flex items-center">
              <img
                src={movieImage}
                alt="Movie Cover"
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{movieTitle}</h3>
                <p className="text-sm text-gray-300">{movieDirector}</p>
              </div>
            </div>
            <H5AudioPlayer
              autoPlay={false}
              src={`https://advanced-internship-api-production.up.railway.app/${audioSrc}`}
              onPlay={(e) => console.log("onPlay")}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AudioPlayerComponent;
