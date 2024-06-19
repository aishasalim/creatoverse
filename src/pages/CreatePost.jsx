import { useState } from 'react';
import { supabase } from '../client.js'
import "./Createpost.css"

const CreatePost = () => {

    const [post, setPost] = useState({name: "", image: "", description: "", youtube: "", twitter: "", instagram: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
        await supabase
          .from('creators')
          .insert({name: post.name, 
            image: post.image, 
            description: post.description, 
            youtube: post.youtube,
            twitter: post.twitter,
            instagram: post.instagram})
          .select();
        window.location = "/";
      }

    return (
        <div>
            <form>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="image">Image</label><br />
                <input type="text" id="image" name="image" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name='description' onChange={handleChange}>
                </textarea>
                <br/>

                <label htmlFor="youtube">Youtube link</label><br />
                <input type="text" id="youtube" name="youtube" onChange={handleChange} /><br />
                <br/>
                <label htmlFor="twitter">Twitter link</label><br />
                <input type="text" id="twitter" name="twitter" onChange={handleChange} /><br />
                <br/>
                <label htmlFor="instagram">Instagram link</label><br />
                <input type="text" id="instagram" name="instagram" onChange={handleChange} /><br />
                <br/>


                <button className='submit-btn' onClick={createPost}>Submit</button>
            </form>
        </div>
    )
}

export default CreatePost