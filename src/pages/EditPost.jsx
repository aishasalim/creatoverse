import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        name: '', 
        image: '', 
        description: '', 
        youtube: '',
        twitter: '',
        instagram: ''
    });

    // Fetch post data when the component mounts
    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single(); // Fetch a single post
            if (data) {
                setPost(data);
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // UPDATE post
    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('creators')
            .update({
                name: post.name, 
                image: post.image, 
                description: post.description, 
                youtube: post.youtube,
                twitter: post.twitter,
                instagram: post.instagram
            })
            .eq('id', id);
        window.location = "/";
    };

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
        <div>
            <form>
                <label htmlFor="name">Name</label> <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={post.name}
                    onChange={handleChange}
                /><br />
                <br/>

                <label htmlFor="image">Image</label><br />
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={post.image}
                    onChange={handleChange}
                /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea
                    rows="5"
                    cols="50"
                    id="description"
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                    style={{font: 'sans-serif'}}
                /><br />
                <br/>

                <label htmlFor="youtube">Youtube link</label><br />
                <input
                    type="text"
                    id="youtube"
                    name="youtube"
                    value={post.youtube}
                    onChange={handleChange}
                /><br />
                <br/>

                <label htmlFor="twitter">Twitter link</label><br />
                <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={post.twitter}
                    onChange={handleChange}
                /><br />
                <br/>

                <label htmlFor="instagram">Instagram link</label><br />
                <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={post.instagram}
                    onChange={handleChange}
                /><br />
                <br/>

                <button className="submit-btn btn" onClick={updatePost}>Submit</button>
                <button className="delete-btn btn" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
};

export default EditPost;
