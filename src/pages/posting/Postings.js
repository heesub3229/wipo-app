import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ImageSlider from "../main/ImageSlider";
import { FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components/Modal";
import {
  formatDate,
  formatTime,
  Loading,
  ToggleBtn,
} from "../../components/Common";
import Posting from "../posting/Posting";
import Profile from "../myPage/Profile";
import { getFile } from "../../components/Util";
import { async } from "q";
import { getOtherPost, getPostMy } from "../../api/PostApi";
import { useNavigate } from "react-router-dom";

export default function Postings() {
  const [ref, inView] = useInView({});
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [friendsPost, setFriendsPost] = useState(false);
  const [selectedProfileSid, setSelectedProfileSid] = useState(null);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const postState = useSelector((state) => state.post);

  useEffect(() => {
    if (postState) {
      if (friendsPost) {
        setPostData(postState.post_other);
      } else {
        setPostData(postState.post_i);
      }
    }
  }, [friendsPost, postState]);

  const handleToggle = () => {
    setFriendsPost((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  const loadMoreData = async () => {
    if (postData.length > 0 && postData.length % 10 > 0) {
      setLoading(true);
      if (friendsPost) {
        if (postState.iPage) {
          const res = await dispatch(getOtherPost(postState.otherPage));
          if (res) {
            const { status } = res.payload;
            if (status === 200) {
              setLoading(false);
            }
          }
        }
      } else {
        if (postState.iPage) {
          const res = await dispatch(getPostMy(postState.iPage));
          if (res) {
            const { status } = res.payload;
            if (status === 200) {
              setLoading(false);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreData();
      setLoading(false);
    }
  }, [inView]);

  const handleOpenModal = (item) => {
    setSelectedPost(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPost(null);
  };

  const truncateText = (text) => {
    if (text.length > 500) {
      return text.slice(0, 500) + " ...";
    }
    return text;
  };

  const getProfileImg = (fileArray) => {
    const handleProfileClick = () => {
      if (fileArray?.sid) {
        setSelectedProfileSid(fileArray?.sid);
      } else {
        setSelectedProfileSid(null);
      }
    };

    return (
      <>
        {!fileArray?.filepath ? (
          <div
            className="w-14 h-14 rounded-full bg-gray-100 flex justify-center items-center text-2xl text-gray-500 cursor-pointer"
            onClick={handleProfileClick}
          >
            <FaUser />
          </div>
        ) : (
          <img
            className="w-14 h-14 bg-gray-50 rounded-full cursor-pointer"
            src={getFile(fileArray?.filepath)}
            alt="profile"
            onClick={handleProfileClick}
          />
        )}
      </>
    );
  };

  const handleProfileClose = () => {
    setSelectedProfileSid(null);
  };

  const handleWritePost = () => {
    navigator("/WritePost");
  };

  return (
    <>
      {postData.length !== 0 ? (
        <div className="mb-3 w-full flex justify-end items-center">
          <p className="mr-2 font-bold">친구 게시물 보기</p>
          <ToggleBtn isOn={friendsPost} handleToggle={handleToggle} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full text-lg select-none">
          <p>등록된 게시물이 없습니다</p>
          <p>WiPo에서 소중한 추억을 기록해보세요 :)</p>
          <p
            className="font-bold text-indigo-500 mt-5 cursor-pointer hover:text-indigo-700"
            onClick={() => handleWritePost()}
          >
            게시물 등록하러 가기
          </p>
        </div>
      )}
      {postData &&
        postData.map((item, index) => {
          const contentLimit = 500;
          const isOverflow = item.post?.content.length > contentLimit;

          return (
            <div
              className="relative bg-white h-80vh w-full rounded-lg p-10 overflow-hidden mb-10"
              key={index}
            >
              <div className="absolute inset-0 w-full h-[10vh] border-b-2 border-gray-100 flex items-center justify-between px-10">
                <div className="flex items-center">
                  {getProfileImg(item.post?.create_user_sid?.file)}
                  {selectedProfileSid && (
                    <Modal
                      isOpen={!!selectedProfileSid}
                      onClose={handleProfileClose}
                    >
                      <Profile info={item.post?.create_user_sid} />
                    </Modal>
                  )}
                  <div className="ml-5">
                    <p className="text-xl font-bold">
                      {item.post?.create_user_sid?.name || ""}
                    </p>
                    <div className="flex space-x-3 items-end">
                      <p>{item.map?.placeName || ""}</p>
                      <div className="flex items-center space-x-1">
                        <div className="w-[3px] h-[3px] bg-gray-400 rounded-full" />
                        <p className="text-gray-500 text-sm">
                          {formatTime(item.post?.create_at) ||
                            formatTime(new Date())}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex h-[60vh] space-x-10 mt-[10vh]">
                <div className="w-[55%] max-h-[60vh] overflow-hidden">
                  <div className="relative font-nanum whitespace-pre-wrap break-all">
                    <p className="inline">{truncateText(item.post?.content)}</p>
                    {isOverflow && (
                      <p
                        className="inline text-indigo-400 hover:text-indigo-700 ml-1 cursor-pointer"
                        onClick={() => handleOpenModal(item)}
                      >
                        더보기
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-[45%]">
                  <ImageSlider images={item.files} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[5vh] border-t  flex items-center justify-end font-bold px-10 text-sm text-gray-600">
                <p>{formatDate(item.post?.date, "dot")}</p>
              </div>
            </div>
          );
        })}
      <div ref={ref} />
      {loading && <Loading />}
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        {selectedPost && <Posting data={selectedPost} />}
      </Modal>
    </>
  );
}
