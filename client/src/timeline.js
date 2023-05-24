import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "./createPost";

const Timeline = () => {
  const [posts, setPosts] = useState(null);
  const [friends, setFriends] = useState([]);
  const currentUser = useSelector(
    (state) => state.user && state.user.currentUser
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/timeline`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        setPosts(result.data.friendPosts);
        setFriends(result.data.friends);
      });
  }, []);
  return (
    <div
      className="bg-stone-950 min-h-screen grid"
      style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
    >
      <div className="p-4 font-bold text-stone-100 text-base">
        <div className="border-b-2 border-neutral-700 py-2">
          <ul>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg"> Home</li>
            <li className="py-3 hover:bg-stone-600 hover:rounded-lg">
              {currentUser}
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
      <div className="m-8 ">
        <div className="p-4 flex flex-col bg-stone-800 items-center justify-center rounded-lg">
          <div className="pb-2 flex items-center w-full gap-6 border-b-2 border-stone-500">
            <div className="bg-blue-400 rounded-full h-14 w-14 text-center">
              P
            </div>
            <div>
              <CreatePost />
            </div>
          </div>
          <div className="w-full flex justify-around items-center pt-2 text-stone-300 font-bold">
            <div className="h-10 text-center flex-1 hover:bg-red-600 hover:rounded-lg">
              Live Video
            </div>
            <div className="h-10 text-center flex-1 hover:bg-lime-600 hover:rounded-lg">
              Upload Photo
            </div>
            <div className="h-10 text-center flex-1 hover:bg-yellow-600 hover:rounded-lg">
              Feeling Activity
            </div>
          </div>
        </div>
        {posts
          ? posts.map((element) => {
              return (
                <div className="mt-5 p-4 bg-stone-800">
                  {currentUser == element.user.username ? (
                    <div>
                      <Link to={`/profile`}>
                        <div>P</div>
                        <div>
                          {element.user.username} - {element.user.first_name}{" "}
                          {element.user.last_name}
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <div>P</div>
                      <Link to={`/pages/${element.user._id}`}>
                        <div>
                          {element.user.username} - {element.user.first_name}{" "}
                          {element.user.last_name}
                        </div>
                      </Link>
                    </div>
                  )}
                  <Link></Link>
                  <div>{element.message}</div>
                  <div>
                    <div>{element.likes} Likes</div>
                    <div>{element.comments}</div>
                  </div>
                  <div>
                    <div>Like</div>
                    <div>Comment</div>
                    <div>Share</div>
                  </div>
                  <div></div>
                </div>
              );
            })
          : null}
      </div>
      <div className="p-4 font-bold text-stone-100 text-sm">
        <h1 className="pt-3 text-lg border-b-2 border-stone-600">Friends</h1>
        <ul className="pt-1">
          {friends
            ? friends.map((friend) => {
                return (
                  <Link to={`/pages/${friend._id}`}>
                    <li className="py-3 hover:bg-stone-600 hover:rounded-lg">
                      {friend.first_name + " " + friend.last_name}
                    </li>
                  </Link>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
