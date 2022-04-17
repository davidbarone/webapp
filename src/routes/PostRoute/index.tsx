import React, { useState, useEffect, FunctionComponent } from 'react';
import { httpGet } from '../../utils/ApiFacade';
import { PostType } from '../../models/PostType';
import MyButton from '../../widgets/myButton';
import MySlider from '../../widgets/mySlider';
import EditPost from '../../components/EditPost';

interface PostProps {
    id: number;
  }

const Post: FunctionComponent<PostProps> = ({ id }) => {
    const [post, setPost] = useState<PostType>({} as PostType);
    const visibilityState = useState<boolean>(false);
    const [sliderVisibility, setSliderVisibility] = visibilityState;

    const init = () => {
        httpGet(`/posts/${id}`, `Loaded post ${id} successfully.`).then((result) => setPost(result.body));
    };

    useEffect(() => {
        init();
    }, [id]);
          
    return (
        <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            {/* Slider for creating new posts */}
            <MySlider visibilityState={visibilityState} onClose={init}>
                <EditPost id={post.id}></EditPost>
            </MySlider>

            <MyButton click={() => { setSliderVisibility(!sliderVisibility); }} label="Edit Post"></MyButton>

        </>
    );
};

export default Post;