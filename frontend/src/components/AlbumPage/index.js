import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAlbums } from "../../store/album";
import { useParams, Link } from "react-router-dom";
import './AlbumPage.css'

function AlbumPage() {

    const dispatch = useDispatch();
    const params = useParams()
    const albums = useSelector(state => state.albums.albums);
    useEffect(() => {
        dispatch(getUserAlbums(params.userId))

    }, [dispatch])

    return(
        <div className='content-container'>
            <div className='content'>
                <div>
                    <Link to='/albums/new'>Create Album</Link>
                </div>
                <ul className="user-albums">
                    {albums?.map((album) => (
                            <li className="each-album">
                                <Link to={`/albums/${album.id}/songs`} key={`${album.id}`}>
                                    <img src={`${album.imageUrl}`} alt="Image Location" />
                                    {album.title}
                                </Link>
                            </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default AlbumPage;
