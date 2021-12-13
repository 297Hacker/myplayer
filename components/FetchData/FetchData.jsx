import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const ArtistContent = styled.section`
    background-color: #0000FF;
    border-radius: 5px;
    color: #FFFFFF;
    height: fit-content;
    text-align: center;
    width:  300px;
`;

const LastFMData = ({artist, APIkey}) => {
    const [lfmData, setLfmData] = useState({});
    useEffect(() => {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${APIkey}&format=json`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(error)
            })
            .then(data => setLfmData(data))
            .catch(() =>
                setLfmData({error: 'Something went wrong!'})
            );
    }, []);

    const buildFMData = () => {
        const {error} = lfmData;
        const track = lfmData?.topalbums?.album;

        if (error) {
            return <p>{error}</p>;
        }

        if (!track) {
            return <p>Loading..</p>
        }

        const [{name: albumName, playcount: totalPlays}] = track;

        return <ArtistContent>
            <h1>{artist}</h1>
            <p>Top albums: {albumName}</p>
            <p>Plays: {totalPlays}</p>
        </ArtistContent>
    };

    return buildFMData();
};

export default LastFMData;