import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import CreatePost from "./createPost";
import { useSelector, useDispatch } from "react-redux";
import { setNotifications } from "./redux/slices/notificationsSlice";
import LikePost from "./likePost";
import LikeComment from "./likeComment";

const Profile = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [bio, setBio] = useState(null);
  const [dob, setDob] = useState(null);
  const [sex, setSex] = useState(null);
  const [posts, setPosts] = useState([]);
  const [writeComment, setWriteComment] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/profile", {
        headers: { Authorization: token },
      })
      .then((result) => {
        console.log(result);
        setFirstName(result.data.resultUser.first_name);
        setLastName(result.data.resultUser.last_name);
        setUsername(result.data.resultUser.username);
        setFriendList(result.data.resultUser.friendList);
        setBio(result.data.resultUser.bio);
        setDob(result.data.resultUser.dob);
        setSex(result.data.resultUser.sex);
        setPosts(result.data.resultPost);
      });
    axios
      .get("http://localhost:8000/notifications", {
        headers: { Authorization: token },
      })
      .then((result) => {
        dispatch(setNotifications(result.data.notifications));
      });
  }, []);

  const handleComment = (postId, e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(postId);
    axios
      .post(
        `http://localhost:8000/post/createComment/${postId}`,
        { message: writeComment },
        {
          headers: { Authorization: token },
        }
      )
      .then((result) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="bg-stone-950 min-h-screen grid"
      style={{ gridTemplateColumns: "1fr 3fr" }}
    >
      <div className="p-4 font-bold text-stone-100 text-base">
        <div className="border-b-2 border-neutral-700 py-2">
          <ul>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg"> Home</li>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg">
              {username}
            </li>
          </ul>
        </div>
        <div className="border-b-2 border-neutral-700 py-2">
          <ul>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg">Watch</li>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg">
              Marketplace
            </li>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg">Gaming</li>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg">Feeds</li>
          </ul>
        </div>
        <div className="border-b-2 border-neutral-700 py-2">
          <ul>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg">Watch</li>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg">
              Marketplace
            </li>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg">Gaming</li>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg">Feeds</li>
          </ul>
        </div>
      </div>
      <div className="ml-8 text-white border-l-2 border-neutral-800">
        <div className="bg-stone-700 pt-8">
          <div className="mx-8 flex justify-start items-center gap-4 border-b-2 border-neutral-500 pb-4">
            <div className="bg-blue-500 min-h-[12rem] min-w-[12rem] rounded-full text-center">
              Profile
            </div>
            <div>
              <h1 className="text-4xl font-bold">{username}</h1>
              <div className="text-xl font-bold">
                {firstName + " " + lastName}
              </div>
              <div className="text-lg font-bold">
                {friendList.length} friends
              </div>
            </div>
          </div>
          <div className="w-full flex justify-around items-center py-3 font-bold text-lg">
            <div className="min-h-[2.5rem] text-center flex-1 hover:bg-stone-600 hover:rounded-lg">
              Posts
            </div>
            <div className="min-h-[2.5rem] text-center flex-1 hover:bg-stone-600 hover:rounded-lg">
              About
            </div>
            <div className="min-h-[2.5rem] text-center flex-1 hover:bg-stone-600 hover:rounded-lg">
              Friends
            </div>
            <div className="min-h-[2.5rem] text-center flex-1 hover:bg-stone-600 hover:rounded-lg">
              Photos
            </div>
          </div>
        </div>
        <div>
          <CreatePost />
        </div>
        <div>
          <div>{firstName}</div>
          <div>{lastName}</div>
          <div>{username}</div>
        </div>
        {posts
          ? posts.map((element) => {
              return (
                <div>
                  <div>
                    {element.user.username} - {element.user.first_name}{" "}
                    {element.user.last_name}
                  </div>
                  <div>{element.message}</div>
                  <div>{element.likes} likes</div>
                  <div>
                    <LikePost postId={element._id} />
                  </div>
                  {element.comments
                    ? element.comments.map((comment) => {
                        return (
                          <div>
                            <div>
                              {comment.user.first_name} {comment.user.last_name}{" "}
                              -{comment.user.username}
                            </div>
                            <div>{comment.message}</div>
                            <div>{comment.likes} Likes</div>
                            <LikeComment commentId={comment._id} />
                          </div>
                        );
                      })
                    : null}
                  <div>
                    <form onSubmit={(e) => handleComment(element._id, e)}>
                      <textarea
                        placeholder="Write a comment"
                        name="message"
                        onChange={(e) => setWriteComment(e.target.value)}
                      ></textarea>
                      <button>Comment</button>
                    </form>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Profile;
