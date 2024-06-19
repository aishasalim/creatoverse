import { useState, useEffect } from 'react';
import { supabase } from '../client.js';
import { Link } from 'react-router-dom';
import './ReadPost.css';
import edit from '../assets/edit.svg';
import instagramIcon from '../assets/instagram.svg';
import twitterIcon from '../assets/twitter.svg';
import youtubeIcon from '../assets/youtube.svg';
import info from '../assets/info.svg';

const ReadPosts = () => {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select();
            
            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                setCreators(data);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="ReadPosts">
            {creators && creators.length > 0 ? creators.map((creator) => (
                <div key={creator.id} className="card" style={{ backgroundImage: `url(${creator.image})` }}>
                    <div className="card-header">
                        <h2 className="name">{creator.name}</h2>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Link style={{ cursor: "pointer", margin: '10px' }} to={`/${creator.id}`}>
                                <img src={info} alt="info" width="25px" />
                            </Link>
                            <Link style={{ cursor: "pointer", margin: '10px' }} to={`/edit/${creator.id}`}>
                                <img style={{ marginTop: '2px' }} src={edit} alt="edit" width="20px" />
                            </Link>
                        </div>
                    </div>
                    <div className="socials">
                        {creator.instagram && (
                            <a href={creator.instagram} target="_blank" style={{ margin: "10px", cursor: "pointer" }} rel="noreferrer">
                                <img src={instagramIcon} alt="instagram" width="20px" />
                            </a>
                        )}
                        {creator.twitter && (
                            <a href={creator.twitter} target="_blank" style={{ margin: "10px", cursor: "pointer" }} rel="noreferrer">
                                <img src={twitterIcon} alt="twitter" width="20px" />
                            </a>
                        )}
                        {creator.youtube && (
                            <a href={creator.youtube} target="_blank" style={{ margin: "10px", cursor: "pointer" }} rel="noreferrer">
                                <img src={youtubeIcon} alt="youtube" width="20px" />
                            </a>
                        )}
                    </div>
                    
                    <p className="description" style={{ marginTop: "1em" }}>{creator.description}</p>
                </div>
            )) : <h2>No Creators Yet</h2>}
        </div>
    )
}

export default ReadPosts;
