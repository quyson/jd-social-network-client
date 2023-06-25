import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./styles.css";

const Friendbar = (props) => {
  const [friends, setFriends] = useState(props.friends);
  console.log(friends);
  return (
    <div className="pt-3" style={{ color: "white" }}>
      <h4 className="font-weight-bold border-bottom border-white mb-3 p-1">
        Friends
      </h4>
      <div>
        {friends ? (
          friends.map((friend) => {
            return (
              <Link to={`/pages/${friend._id}`}>
                <div className="p-2 font-weight-bold friend d-flex justify-content-start align-items-center">
                  <div
                    className="bg-white rounded-circle ml-1 mr-2"
                    style={{ height: "2rem", width: "2rem" }}
                  ></div>
                  {friend.first_name + " " + friend.last_name}
                </div>
              </Link>
            );
          })
        ) : (
          <div>no friends</div>
        )}
      </div>
    </div>
  );
};

export default Friendbar;
