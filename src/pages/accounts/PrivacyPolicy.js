import React from "react";
import { ModalTitle } from "../../components/Typography";
import { CheckboxM } from "../../components/Checkbox";

export default function PrivacyPolicy({ isChecked, handleCheckboxChange }) {
  return (
    <div className="w-1/3 max-h-[80vh] bg-white p-10 rounded-md shadow-lg border border-solid border-gray-200 flex flex-col overflow-y-auto ">
      <ModalTitle text="개인정보 수집 및 이용 동의서" />
      <p className="mt-10 font-nanum text-gray-700">
        <span className="font-bold">1. 개인정보 수집 및 이용 목적</span> 회사는
        회원가입 및 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다. 수집된
        개인정보는 다음의 목적을 위해 사용됩니다.
      </p>
      <ul className="mt-4 font-nanum text-gray-700 list-disc list-inside">
        <li>회원 식별 및 관리</li>
        <li>서비스 제공 및 서비스 품질 향상</li>
        <li>고객 지원 및 상담 제공</li>
        <li>서비스 개선 및 신규 서비스 개발</li>
      </ul>

      <p className="mt-10 font-nanum text-gray-700">
        <span className="font-bold">2. 수집하는 개인정보의 항목</span> 회사는
        회원가입 시 다음과 같은 개인정보를 수집합니다.
      </p>
      <ul className="mt-4 font-nanum text-gray-700 list-disc list-inside">
        <li>이름</li>
        <li>이메일 주소</li>
        <li>생년월일</li>
      </ul>

      <p className="mt-10 font-nanum text-gray-700">
        <span className="font-bold">3. 개인정보 보유 및 이용 기간</span> 회사는
        회원이 서비스를 이용하는 동안 개인정보를 보유하며, 서비스 탈퇴 요청 시
        회원의 개인정보는 지체 없이 파기됩니다. 단, 관계 법령에 따라 일정 기간
        보관할 필요가 있는 경우 해당 기간 동안 보관됩니다.
      </p>
      <ul className="mt-4 font-nanum text-gray-700 list-disc list-inside">
        <li>
          전자상거래 등에서의 소비자 보호에 관한 법률에 따른 계약 또는 청약철회
          등에 관한 기록: 5년
        </li>
        <li>
          전자상거래 등에서의 소비자 보호에 관한 법률에 따른 대금 결제 및 재화
          등의 공급에 관한 기록: 5년
        </li>
        <li>
          전자상거래 등에서의 소비자 보호에 관한 법률에 따른 소비자 불만 또는
          분쟁 처리에 관한 기록: 3년
        </li>
      </ul>

      <p className="mt-10 font-nanum text-gray-700">
        <span className="font-bold">
          4. 개인정보 제공 동의 거부 권리 및 거부 시 불이익
        </span>{" "}
        회원은 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의를
        거부할 경우 회원가입이 제한될 수 있습니다. 다만, 서비스 제공을 위해
        필수적인 정보이므로 일부 서비스 이용에 제한이 있을 수 있습니다.
      </p>

      <p className="mt-10 font-nanum text-gray-700">
        <span className="font-bold">5. 동의 여부 확인</span> 위 내용에 대해
        충분히 이해하였으며, 개인정보 수집 및 이용에 동의합니다.
      </p>

      <div className="mt-5">
        <CheckboxM
          text="동의합니다."
          checked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}
