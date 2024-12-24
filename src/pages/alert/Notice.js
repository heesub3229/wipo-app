import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { formatFullDate } from "../../components/Common";

const noticeEx = {
  alertSid: 1,
  title: "2024. 12. 09 업데이트 내용에 대해 공지드립니다.",
  content: `안녕하세요, 회원 여러분.

2024년 12월 9일부로 새로운 업데이트가 적용됩니다. 이번 업데이트를 통해 더욱 향상된 서비스 경험을 제공하기 위해 다음과 같은 주요 변경 사항을 준비했습니다:

사용자 인터페이스 개선

보다 직관적이고 깔끔한 디자인으로 변경되었습니다.
주요 기능에 대한 접근성이 대폭 향상되었습니다.
새로운 기능 추가

[기능 이름]: [기능 설명]
[기능 이름]: [기능 설명]
버그 수정 및 안정성 강화

기존에 보고된 문제점들이 해결되었으며, 서비스의 안정성을 높였습니다.
앞으로도 더 나은 서비스를 제공하기 위해 최선을 다하겠습니다. 자세한 사항은 업데이트 노트를 확인해주세요.

감사합니다.
[Wipo] 드림.
안녕하세요, 회원 여러분.

2024년 12월 9일부로 새로운 업데이트가 적용됩니다. 이번 업데이트를 통해 더욱 향상된 서비스 경험을 제공하기 위해 다음과 같은 주요 변경 사항을 준비했습니다:

사용자 인터페이스 개선

보다 직관적이고 깔끔한 디자인으로 변경되었습니다.
주요 기능에 대한 접근성이 대폭 향상되었습니다.
새로운 기능 추가

[기능 이름]: [기능 설명]
[기능 이름]: [기능 설명]
버그 수정 및 안정성 강화

기존에 보고된 문제점들이 해결되었으며, 서비스의 안정성을 높였습니다.
앞으로도 더 나은 서비스를 제공하기 위해 최선을 다하겠습니다. 자세한 사항은 업데이트 노트를 확인해주세요.

감사합니다.
[Wipo] 드림.`,
  createdTime: "2024-12-12T17:39:45.123+09:00[Asia/Seoul]",
};
export default function Notice({ alertSid, onClose }) {
  const [notice, setNotice] = useState({});
  useEffect(() => {
    // alertSid로 해당 공지 검색
    setNotice(noticeEx);
  }, [alertSid]);

  return (
    <div className="relative bg-white h-[90vh] w-[40%] rounded-lg py-10">
      <div className="bg-indigo-950 w-full h-[4vh] rounded-t-md absolute inset-0 flex justify-end items-center px-2">
        <FaXmark
          className="text-white text-3xl hover:bg-white hover:bg-opacity-20 rounded-full cursor-pointer p-1"
          onClick={() => onClose()}
        />
      </div>
      <div className="h-full px-10 overflow-auto">
        <p className="pt-[4vh] text-2xl text-center font-bold">
          {notice.title}
        </p>
        <p className="text-right text-sm my-5">
          {formatFullDate(notice.createdTime)}
        </p>
        <div className="relative whitespace-pre-wrap break-all pt-[3vh]">
          <p>{notice.content}</p>
        </div>
      </div>
    </div>
  );
}
