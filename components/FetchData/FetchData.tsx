import React, {useEffect} from 'react';

type ButtonProps = {
    album_name: string
    album_cover: string
    album_year: number
}


const Button: React.FC<ButtonProps> = (item) => {
    const fetchData = () => {
        return fetch("http://www.last.fm/api/auth/?api_key=d732731be2f5f0ec4b10e5a3607d7090")
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    useEffect(() => {fetchData()}, []);

    return <>
        item.album_name, item.album_cover, item.album_year;
    </>
};

export default Button;