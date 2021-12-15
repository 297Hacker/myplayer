import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const ArtistContent = styled.section`
    background-color: #F4F4F4;
    border-radius: 3px;
    color: #000000;
    float: left;
    height: fit-content;
    margin: 10px 10px;
    padding: 20px 0;
    text-align: center;
    width: calc(20% - 20px);
    transition: background-color 0.4s ease-out;
    
    &:hover {
    background-color: #C0C0C0;
    cursor: pointer;
    transition: background-color 0.4s ease-in;
    }
    
    p {
        font-size: 14px;
        text-transform: uppercase;
    }
`;

const Cover = styled.img`
    height: 100px;
    width: 100px;
`;

const H1 = styled.h1`
    text-align: center;
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

        let trackList = track.map((artist, i) => {
            return <ArtistContent onClick={viewSongs} key={i}>
                <Cover src={artist.image[3]['#text']}/>
                <p>{artist.name}</p>
                <p>{artist.playcount} plays</p>
            </ArtistContent>
        });

        return <>
            <H1>{artist} Albums</H1>
            {trackList}
        </>
    };

    return buildFMData();
};

const viewSongs = (album) => {
    console.log('clicked')
    // const [songs, setSongs] = useState({});
    // useEffect(() => {
    //     fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${APIkey}&format=json`)
    //         .then(response => {
    //             if (response.ok) {
    //                 return response.json();
    //             }
    //             throw new Error(error)
    //         })
    //         .then(data => setSongs(data))
    //         .catch(() =>
    //             setSongs({error: 'Something went wrong!'})
    //         );
    // }, []);
};

export default LastFMData;