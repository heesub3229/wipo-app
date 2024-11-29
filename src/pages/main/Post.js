import React from "react";
import ImageSlider from "./ImageSlider";

const data = [
  {
    id: 1,
    title: "제목입니당 1",
    content: `오늘은 오랜만에 떠난 여행에서 정말 뜻깊은 하루를 보냈다. 아침 일찍 일어나 인천 부평으로 향했다. 첫 번째 목적지는 부평역 근처의 유명한 부평 문화의 거리. 활기찬 거리와 소소한 상점들이 어우러져 정말 아기자기한 느낌이었다.

점심은 부평 전통시장에서 해결했다. 따끈따끈한 칼국수 한 그릇과 시장표 만두를 먹었는데, 이게 정말 꿀맛! 사람 사는 정이 느껴지는 그런 식사였다.

오후에는 부평 숲공원으로 산책을 갔다. 늦가을의 낙엽이 바닥을 덮고 있었고, 공원 안은 고요하고 평화로웠다. 커피 한 잔을 들고 천천히 걸으니 복잡했던 마음이 한결 가벼워지는 기분이었다.

마지막으로 부평아트센터에 들러 작은 전시회를 구경했다. 지역 예술가들의 작품을 감상했는데, 작품 속에 담긴 이야기가 참 따뜻하고 정겨웠다.

저녁에는 근처의 작은 카페에 들러 일기를 쓰며 하루를 마무리했다. 여행은 늘 새로운 것들을 발견하게 해 주는 멋진 경험이라는 걸 오늘도 다시 느낄 수 있었다.`,
    location: "인천 광역시 부평구",
    createTime: "2024-11-21T16:28:27.4655229",
    date: "20241121",
  },
  {
    id: 2,
    title: "제목입니당 2",
    content: "내용입니당",
    location: "인천 광역시 부평구 부평동",
    createTime: "2024-11-21T16:28:27.4655229",
    date: "20241118",
  },
  {
    id: 3,
    title: "제목입니당 3",
    content: "내용입니당",
    location: "인천 광역시 부평구 부평동",
    createTime: "2024-11-21T16:28:27.4655229",
    date: "20241118",
  },
];

const fileData = [
  { id: 1, url: "https://via.placeholder.com/600x300?text=Image+11" },
  { id: 1, url: "https://via.placeholder.com/300x300?text=Image+12" },
  { id: 1, url: "https://via.placeholder.com/600x300?text=Image+13" },
  { id: 2, url: "https://via.placeholder.com/300x600?text=Image+21" },
  { id: 2, url: "https://via.placeholder.com/600x300?text=Image+22" },
  { id: 2, url: "https://via.placeholder.com/600x300?text=Image+23" },
  { id: 3, url: "https://via.placeholder.com/600x300?text=Image+31" },
  { id: 3, url: "https://via.placeholder.com/600x300?text=Image+32" },
];

export default function Post() {
  return (
    <>
      {data &&
        data.map((item) => {
          const filteredImages = fileData
            .filter((file) => file.id === item.id)
            .map((file) => file.url);

          return (
            <div
              className="bg-white h-80vh w-full rounded-lg p-10 overflow-hidden"
              key={item.id}
            >
              <p className="font-nanum text-2xl font-bold">
                {item.date.replace(/^(\d{4})(\d{2})(\d{2})$/, `$1년 $2월 $3일`)}
              </p>
              <p className="font-nanum text-xl mt-2">{item.location}</p>
              <div className="mt-10 flex h-full space-x-5">
                <div className="w-full h-full">
                  <p className="font-nanum whitespace-pre-wrap break-all">
                    {item.content}
                  </p>
                </div>
                <div className="w-full">
                  <ImageSlider images={filteredImages} />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
