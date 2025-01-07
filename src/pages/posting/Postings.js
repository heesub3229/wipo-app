import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ImageSlider from "../main/ImageSlider";
import { FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Modal } from "../../components/Modal";
import {
  formatDate,
  formatTime,
  Loading,
  ToggleBtn,
} from "../../components/Common";
import Posting from "../posting/Posting";
import Profile from "../myPage/Profile";

const getPostInfo = (postSid) => {
  return postInfo.find((post) => post.postSid === postSid);
};

const postMaster = [
  {
    sid: 1,
    date: "20241217",
    content: `내용1`,
    createAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 2,
    date: "20241215",
    content: `내용2`,
    createAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 3,
    date: "20241214",
    content: `내용3`,
    createAt: "2024-12-14T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 2,
  },
  {
    sid: 4,
    date: "20241217",
    content: `내용4`,
    createAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 5,
    date: "20241215",
    content: `내용5`,
    createAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 6,
    date: "20241214",
    content: `내용6`,
    createAt: "2024-12-14T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 2,
  },
  {
    sid: 7,
    date: "20241217",
    content: `내용7`,
    createAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 8,
    date: "20241215",
    content: `내용8`,
    createAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 9,
    date: "20241214",
    content: `내용9`,
    createAt: "2024-12-14T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 2,
  },
  {
    sid: 10,
    date: "20241217",
    content: `내용10`,
    createAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 11,
    date: "20241215",
    content: `내용11`,
    createAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 12,
    date: "20241214",
    content: `내용12`,
    createAt: "2024-12-14T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 2,
  },
  {
    sid: 13,
    date: "20241217",
    content: `내용13`,
    createAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 14,
    date: "20241215",
    content: `내용14`,
    createAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 15,
    date: "20241214",
    content: `내용15`,
    createAt: "2024-12-14T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 2,
  },
  {
    sid: 16,
    date: "20241217",
    content: `내용16`,
    createAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 17,
    date: "20241215",
    content: `내용17`,
    createAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 18,
    date: "20241214",
    content: `내용18`,
    createAt: "2024-12-14T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 2,
  },
  {
    sid: 19,
    date: "20241217",
    content: `내용19`,
    createAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-17T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 20,
    date: "20241215",
    content: `내용20`,
    createAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 1,
  },
  {
    sid: 21,
    date: "20241214",
    content: `내용21`,
    createAt: "2024-12-14T17:39:45.123+09:00[Asia/Seoul]",
    updateAt: "2024-12-15T17:39:45.123+09:00[Asia/Seoul]",
    createUserSid: 2,
  },
];

const postInfo = [
  {
    postSid: 1,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "경복궁",
    files: [
      {
        fileSid: 1,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 2,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 2,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "첨성대",
    files: [
      {
        fileSid: 3,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 4,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 3,
    name: "김희섭",
    email: "heesub3229@naver.com",
    dateBirth: "19901204",
    profileColor: "Blue",
    fileSid: 112,
    placeName: "인천 공항",
    files: [
      {
        fileSid: 5,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 6,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 4,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "경복궁",
    files: [
      {
        fileSid: 1,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 2,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 5,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "첨성대",
    files: [
      {
        fileSid: 3,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 4,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 6,
    name: "김희섭",
    email: "heesub3229@naver.com",
    dateBirth: "19901204",
    profileColor: "Blue",
    fileSid: 112,
    placeName: "인천 공항",
    files: [
      {
        fileSid: 5,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 6,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 7,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "경복궁",
    files: [
      {
        fileSid: 1,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 2,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 8,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "첨성대",
    files: [
      {
        fileSid: 3,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 4,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 9,
    name: "김희섭",
    email: "heesub3229@naver.com",
    dateBirth: "19901204",
    profileColor: "Blue",
    fileSid: 112,
    placeName: "인천 공항",
    files: [
      {
        fileSid: 5,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 6,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 10,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "경복궁",
    files: [
      {
        fileSid: 1,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 2,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 11,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "첨성대",
    files: [
      {
        fileSid: 3,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 4,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 12,
    name: "김희섭",
    email: "heesub3229@naver.com",
    dateBirth: "19901204",
    profileColor: "Blue",
    fileSid: 112,
    placeName: "인천 공항",
    files: [
      {
        fileSid: 5,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 6,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 13,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "경복궁",
    files: [
      {
        fileSid: 1,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 2,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 14,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "첨성대",
    files: [
      {
        fileSid: 3,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 4,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 15,
    name: "김희섭",
    email: "heesub3229@naver.com",
    dateBirth: "19901204",
    profileColor: "Blue",
    fileSid: 112,
    placeName: "인천 공항",
    files: [
      {
        fileSid: 5,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 6,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 16,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "경복궁",
    files: [
      {
        fileSid: 1,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 2,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 17,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "첨성대",
    files: [
      {
        fileSid: 3,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 4,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 18,
    name: "김희섭",
    email: "heesub3229@naver.com",
    dateBirth: "19901204",
    profileColor: "Blue",
    fileSid: 112,
    placeName: "인천 공항",
    files: [
      {
        fileSid: 5,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 6,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 19,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "경복궁",
    files: [
      {
        fileSid: 1,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 2,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 20,
    name: "이주영",
    email: "juyoung05@hanmail.net",
    dateBirth: "20000509",
    profileColor: "Red",
    fileSid: 111,
    placeName: "첨성대",
    files: [
      {
        fileSid: 3,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 4,
        fileName: "",
        filePath: "",
      },
    ],
  },
  {
    postSid: 21,
    name: "김희섭",
    email: "heesub3229@naver.com",
    dateBirth: "19901204",
    profileColor: "Blue",
    fileSid: 112,
    placeName: "인천 공항",
    files: [
      {
        fileSid: 5,
        fileName: "",
        filePath: "",
      },
      {
        fileSid: 6,
        fileName: "",
        filePath: "",
      },
    ],
  },
];

export default function Postings() {
  const [ref, inView] = useInView({});
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_LOAD = 5;
  const [profileUrl, setProfileUrl] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProfileSid, setSelectedProfileSid] = useState(null);

  const authState = useSelector((state) => state.auth);

  const handleToggle = () => {
    setShowMyPosts((prev) => !prev);
  };

  // useEffect(() => {
  //   if (showMyPosts) {
  //     const myPost = postMaster.filter(
  //       (item) => item.createUserSid === authState.userSid
  //     );
  //     setPostData(myPost);
  //   } else {
  //     setPostData(postMaster);
  //   }
  // }, [showMyPosts]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  const loadMoreData = () => {
    if (loading || postData.length >= postMaster.length) return;

    setLoading(true);
    const nextData = postMaster.slice(
      postData.length,
      postData.length + ITEMS_PER_LOAD
    );

    setPostData((prev) => [...prev, ...nextData]);
    setLoading(false);
  };

  useEffect(() => {
    if (inView) {
      loadMoreData();
    }
  }, [inView]);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPost(null);
  };

  const truncateText = (text) => {
    if (text.length > 600) {
      return text.slice(0, 600) + " ...";
    }
    return text;
  };

  const getProfileImg = (fileSid) => {
    const handleProfileClick = () => {
      setSelectedProfileSid(fileSid);
    };

    return (
      <>
        {!profileUrl ? (
          <div
            className="w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-100 flex justify-center items-center text-2xl text-gray-500 cursor-pointer"
            onClick={handleProfileClick}
          >
            <FaUser />
          </div>
        ) : (
          <img
            className="w-14 h-14 rounded-full cursor-pointer"
            src={profileUrl}
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

  return (
    <>
      <div className="mb-3 w-full flex justify-end items-center">
        <p className="mr-2 font-bold">내 게시물만 보기</p>
        <ToggleBtn isOn={showMyPosts} handleToggle={handleToggle} />
      </div>
      {postData &&
        postData.map((item) => {
          const contentLimit = 600;
          const isOverflow = item.content.length > contentLimit;

          return (
            <div
              className="relative bg-white h-80vh w-full rounded-lg p-10 overflow-hidden mb-10"
              key={item.sid}
            >
              <div className="absolute inset-0 w-full h-[10vh] border-b-2 border-gray-100 flex items-center justify-between px-10">
                <div className="flex items-center">
                  {getProfileImg(item.sid)}
                  {selectedProfileSid === item.sid && (
                    <Modal
                      isOpen={!!selectedProfileSid}
                      onClose={handleProfileClose}
                    >
                      <Profile info={getPostInfo(item.sid)} />
                    </Modal>
                  )}
                  <div className="ml-5">
                    <p className="text-xl font-bold">
                      {getPostInfo(item.sid).name}
                    </p>
                    <div className="flex space-x-3 items-end">
                      <p>{getPostInfo(item.sid).placeName}</p>
                      <div className="flex items-center space-x-1">
                        <div className="w-[3px] h-[3px] bg-gray-400 rounded-full" />
                        <p className="text-gray-500 text-sm">
                          {formatTime(item.createAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex h-[60vh] space-x-10 mt-[10vh]">
                <div className="w-[55%] max-h-[60vh] overflow-hidden">
                  <div className="relative font-nanum whitespace-pre-wrap break-all">
                    <p className="inline">{truncateText(item.content)}</p>
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
                <div className="w-[45%]">{/* <ImageSlider /> */}</div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[5vh] border-t  flex items-center justify-end font-bold px-10 text-sm text-gray-600">
                <p>{formatDate(item.date, "dot")}</p>
              </div>
            </div>
          );
        })}
      <div ref={ref} />
      {loading && <Loading />}
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        {selectedPost && (
          <Posting post={selectedPost} images={selectedImages} />
        )}
      </Modal>
    </>
  );
}
