import React, { useState } from "react";
import axios from "axios";
import env from "react-dotenv";
import { Notify } from "./Notify";
import { StyledInput } from "./styledcomponents/StyledInput";
import { StyledButton } from "./styledcomponents/StyledButton";
import { StyledForm } from "./styledcomponents/StyledForm";
import { StyledUl } from "./styledcomponents/StyledUl";
import { StyledLi } from "./styledcomponents/StyledLi";
import { StyledVideoWrapper } from "./styledcomponents/StyledVideoWrapper";

export const VideoSearch = () => {
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoader] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [isNotifyError, setIsNotifyError] = useState(false);
    const [videos, setVideos] = useState<any[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<any>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsNotifyError(false);
        setNotifyMessage("");
        if (!searchValue || !searchValue.trim()) {
            setIsNotifyError(true);
            setNotifyMessage("Search input cannot be empty");
        }
        setLoader(true);
        setNotifyMessage("Loading . . . ");
        try {
            const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    part: "snippet",
                    q: searchValue,
                    key: env.API_KEY
                }
            });
            setVideos(response.data.items);
        } catch (error: any) {
            setIsNotifyError(true);
            setNotifyMessage(error.message);
        } finally {
            setNotifyMessage("");
            setLoader(false);
        }
    };

    const handleVideoSelect = (video: any) => {
        setSelectedVideo(video);
    };

    return (
        <div>
            <StyledForm onSubmit={handleSearchSubmit}>
                <StyledInput
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Type here to search video"
                />
                <StyledButton>Search</StyledButton>
            </StyledForm>
            {selectedVideo && (
                <StyledVideoWrapper>
                    <h4>{selectedVideo.snippet.title}</h4>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                        title={selectedVideo.snippet.title}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </StyledVideoWrapper>
            )}
            <StyledUl>
                {videos.map((video) => (
                    <StyledLi key={video.id.videoId} onClick={() => handleVideoSelect(video)}>
                        <div>
                            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                        </div>
                        <div>
                            <span>{video.snippet.title}</span>
                        </div>
                    </StyledLi>
                ))}
            </StyledUl>
            <Notify message={notifyMessage} loading={loading} isError={isNotifyError} />
        </div>
    );
};