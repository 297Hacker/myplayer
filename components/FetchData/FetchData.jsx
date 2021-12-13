import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const coverContent = styled.figure`
    border: 1px #cccccc solid;
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

        const [
            {name: albumName, image: {'#text': cover} = {}} = {}
        ] = track;

        return <section>
            <p>You are listing to: {albumName}</p>
            <coverContent>
                <img src={cover}/>
                <figcaption>{albumName}</figcaption>
            </coverContent>
        </section>
    };

    return buildFMData();
};

export default LastFMData;