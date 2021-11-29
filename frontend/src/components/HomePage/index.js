import React, {useEffect, useState } from 'react';
import { getAlbum} from '../../store/album';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AlbumCard from '../AlbumCard';
import './HomePage.css'
import ProfileButton from '../Navigation/ProfileButton';
import Navigation from '../Navigation';
function HomePage() {
    const dispatch = useDispatch();
    let newAlbums = [];
    const albums = useSelector(state => state?.albums?.albums)
    const sessionUser = useSelector(state => state.session.user);
    if(albums?.length >= 5){
        newAlbums = albums?.slice(0, 6)
    } else{
        newAlbums = albums
    }
    // const newAlbums = useSelector(state => state.albums.albums)

    useEffect(() => {
        dispatch(getAlbum())
    }, [dispatch])

    return (
        <>
            <div className='content-container home-header'>
                <Navigation />
                <ProfileButton user={sessionUser} />
                <h2 style={{color:'white'}}>
                    New
                </h2>
                <ul className='home-page-content'>

                    {Array.isArray(newAlbums) && newAlbums?.map((album) => (
                            <AlbumCard album={album}/>
                        ))}
                 </ul>
                <div className='discover'>
                    <h2 style={{color:'white'}}>Discover</h2>
                </div>

            </div>
        </>
    )
}

export default HomePage;
