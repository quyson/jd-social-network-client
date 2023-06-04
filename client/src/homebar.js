import React from "react";
import { useSelector } from "react-redux";

const Homebar = () => {
  const currentUser = useSelector(
    (state) => state.user && state.user.currentUser
  );
  return (
    <div className="p-4 font-bold text-stone-100 text-base min-w-[25%]">
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
  );
};

export default Homebar;
