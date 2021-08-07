import { useState } from "react";
import { useHistory  } from "react-router-dom"; 

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsLoading(true);

        // console.log(title, blog, author);
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
        }).then(() => {
            console.log('new blog added');
            setIsLoading(false);
            // history.go(-1);
            history.push('/');
        });

    }

    return ( 
        <div className="create">
            <h2>Create Blog</h2>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="title">Blog Title</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title"
                    defaultValue={ title }
                    onChange={(e) => setTitle(e.target.value)}
                    required />
                <label htmlFor="body">Blog Body</label>
                <textarea 
                    name="body" 
                    id="body"
                    onChange={(e) => setBody(e.target.value)}
                    defaultValue={ body }
                    required/>
                <label htmlFor="author">Blog Author</label>
                <select 
                    name="author" 
                    id="author"
                    defaultValue={ author }
                    onChange={(e) => setAuthor(e.target.value)}
                    required>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isLoading && <button>Add Blog</button>}
                { isLoading && <button disabled>Adding Blog...</button>}
                <p>{ title }</p>
                <p>{ body }</p>
                <p>{ author }</p>
            </form>
        </div>
     );
}
 
export default Create;