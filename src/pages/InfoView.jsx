import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './InfoView.css';
import { Link } from 'react-router-dom';
import instagramIcon from '../assets/instagram.svg';
import twitterIcon from '../assets/twitter.svg';
import youtubeIcon from '../assets/youtube.svg';

const InfoView = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState({
        name: '', 
        image: '', 
        description: '', 
        youtube: '',
        twitter: '',
        instagram: ''
    });

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching creator:', error);
            } else {
                setCreator(data);
            }
        };

        fetchCreator();
    }, [id]);

        // DELETE post
        const deletePost = async (event) => {
            event.preventDefault();
            const confirmDelete = window.confirm("Are you sure you want to delete?");
            if (confirmDelete) {
                await supabase
                    .from('creators')
                    .delete()
                    .eq('id', id); 
                window.location = "/";
            }
        };
        

    return (
        <div className="info-view">
        <div className="info-content">
            {creator.image && <div className="info-image" style={{ backgroundImage: `url(${creator.image})` }} />}
            <div className="info-text">
                <h2 className="info-name">{creator.name}</h2>
                <p className="info-description">{creator.description}</p>
                <div className="info-socials">
                    {creator.instagram && (
                        <a href={creator.instagram} target="_blank" rel="noreferrer">
                            <img src={instagramIcon} alt="Instagram" width="40px" />
                        </a>
                    )}
                    {creator.twitter && (
                        <a href={creator.twitter} target="_blank" rel="noreferrer">
                            <img src={twitterIcon} alt="Twitter" width="40px" />
                        </a>
                    )}
                    {creator.youtube && (
                        <a href={creator.youtube} target="_blank" rel="noreferrer">
                            <img src={youtubeIcon} alt="YouTube" width="40px" />
                        </a>
                    )}
                </div>
                <Link to={`/edit/${creator.id}`}><button className="edit-btn btn">Edit</button></Link>
                <button className="delete-btn btn" onClick={deletePost}>Delete</button>
            </div>
        </div>
    </div>
    );
};

export default InfoView;
