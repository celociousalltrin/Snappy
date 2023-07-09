import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";

import commentProfile from "../../assets/mock-image/5mutual.jpg";

import "./style.css";
import AppTextArea from "../app-text-area";

const SingleFeed = ({ singleFeedData }) => {
  return (
    <div>
      {
        <div key={`s_fd_data${singleFeedData.id}`} className="mb-4">
          <div className="d-flex single-feed-container p-2 pb-0">
            <img
              src={singleFeedData.profile_img}
              alt="pic-img"
              width="40px"
              height="40px"
              className="profile-image me-2"
            />
            <div>
              <p className="fw-bold mb-0">{singleFeedData.name}</p>
              <p className="text-muted">{`@${singleFeedData.snappy_username}`}</p>
            </div>
          </div>
          <div className="container">
            <div className="border-bottom">
              <p className="mb-2">{singleFeedData.snapp.message}</p>
              <img
                src={singleFeedData.snapp.image}
                alt="pic-img"
                width="100%"
                height="60%"
                className="rounded"
              />
              <p className="mt-3 text-muted">{singleFeedData.snapped_at}</p>
            </div>
            <div className="d-flex snapp-feed-data border-bottom mt-3">
              <p>
                {singleFeedData.likes}
                <span>Likes</span>
              </p>
              <p>
                {singleFeedData.bookmarks}
                <span>Bookmarks</span>
              </p>
              <p>
                {singleFeedData.comments_count}
                <span>Comments</span>
              </p>
            </div>
            <div className="d-flex justify-content-around mt-3 pb-3 border-bottom">
              <div>
                <AiOutlineLike size={20} /> <span>80</span>
              </div>
              <div>
                <FaRegComment size={20} /> <span>27</span>
              </div>
              <div>
                <FaRegBookmark size={20} />
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex">
                <img
                  src={commentProfile}
                  alt="comment-profile"
                  width="40px"
                  height="40px"
                  className="profile-image me-2"
                />
                <AppTextArea
                  placeholder="Add Your Comment"
                  rows="1"
                  cols="80"
                />
              </div>
              <div className="d-flex justify-content-end mt-2 border-bottom pb-3">
                <button className="btn btn-sm me-1 btn-primary rounded ">
                  Add Comment
                </button>
              </div>
            </div>
            <div className="mt-2">
              {singleFeedData.comments.map((obj) => (
                <div key={`cmnt${obj.id}`} className="border-bottom mt-2 pb-3">
                  <div className="d-flex">
                    <img
                      src={obj.user_profile_pic}
                      alt="pic-img"
                      width="40px"
                      height="40px"
                      className="profile-image me-2"
                    />
                    <p className="fw-bold">{obj.user_name}</p>
                    <p className="text-muted ms-2">{`@${obj.snapp_user_name}`}</p>
                    <p className="text-muted ms-2">{`.${obj.commented_at}`}</p>
                  </div>
                  <p>{obj.msg}</p>
                  <div>
                    {obj?.replied?.map((o) => (
                      <div>
                        <div key={`${o.id}`} className="d-flex mt-3">
                          <img
                            src={o.user_profile_pic}
                            alt="pic-img"
                            width="40px"
                            height="40px"
                            className="profile-image me-2"
                          />
                          <p className="fw-bold">{o.user_name}</p>
                          <p className="text-muted ms-2">{`@${o.snapp_user_name}`}</p>
                          <p className="text-muted ms-2">{`.${o.commented_at}`}</p>
                        </div>
                        <p>{o.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default SingleFeed;
