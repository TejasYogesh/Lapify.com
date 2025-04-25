import React, { useRef } from "react";

function StyledVideoPlayer() {
    const videoRef = useRef(null);

    // useEffect(() => {
    //     const video = videoRef.current;
    //     if (video) {
    //         video.addEventListener("ended", () => {
    //             video.pause(); // Stop looping after the first play.
    //         });
    //     }
    // }, []);

    return (
        <div style={{ position: "relative", width: "1500px", height: "860px" }}>
            {/* Black overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                    opacity: 0.5, // Adjust the opacity for shading.
                    zIndex: 1,
                }}
            />

            {/* Video */}
            <video
                ref={videoRef}
                width="1600"
                height="360"
                loop={false} // Looping only once.
                autoPlay
                muted // For silent playback.
                style={{ position: "absolute", zIndex: 0 , borderRadius:30 , margin:10}}
            >
                <source src="macbookad.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default StyledVideoPlayer;