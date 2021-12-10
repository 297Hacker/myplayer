import React, {useState, useEffect} from 'react';

const artist = "Drake";
const key = 'd732731be2f5f0ec4b10e5a3607d7090';

const LastFMData = () => {
    const [lfmData, updateLfmData] = useState({});
    useEffect(() => {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${key}&format=json`)
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                }
                throw new Error('error');
            })
            .then(data => updateLfmData(data))
            .catch(() =>
                updateLfmData({ error: 'Something went wrong with Last.fm' })
            );
    }, []);

    const buildLastFmData = () => {
        const  { error } = lfmData;
        const track = lfmData?.recenttracks?.track;

        if (error) {
            return <p>{error}</p>;
        }

        if (!track) {
            return <p>Loading</p>;
        }

        const [
            { name: songName, artist: { '#text': artistName } = {} } = {}
        ] = track;

        return <h3>Currently listening to: {songName} by {artistName}</h3>;
    };

    return buildLastFmData();
};

export default LastFMData;