import React from "react";
import "./Description.css"; // 스타일을 위해 추가

function Description() {
  return (
    <div className="description-container">
      <h1>방문 정보 페이지 사용법</h1>
      
      <section className="description-section">
        <h2>1. 정보 추가</h2>
        <p>
          페이지 상단의 <strong>"추가"</strong> 버튼을 클릭하여 새로운 방문 정보를 추가할 수 있습니다.
          새로 추가된 정보는 자동으로 <strong>남은 날짜(D-Day)</strong>를 기준으로 정렬되어 리스트에 표시됩니다.
        </p>
      </section>

      <section className="description-section">
        <h2>2. 리스트 정렬</h2>
        <p>
          방문 리스트는 각 방문 날짜를 기준으로 정렬됩니다. <strong>남은 날짜(D-Day)</strong>를 기준으로 오름차순 정렬되어,
          오늘부터 가장 가까운 날짜의 방문 정보가 상단에 표시됩니다.
        </p>
      </section>

      <section className="description-section">
        <h2>3. 상세보기</h2>
        <p>
          각 방문 항목 오른쪽에 있는 <strong>"상세보기"</strong> 버튼을 클릭하면, 해당 방문에 대한 자세한 정보를 확인할 수 있는 팝업이 열립니다.
          여기에서는 방문자의 이름, 전화번호, 주소, 메모, 최근 방문 날짜 등 상세한 정보가 제공됩니다.
        </p>
      </section>

      <section className="description-section">
        <h2>4. 수정</h2>
        <p>
          방문 항목 오른쪽에 있는 <strong>"수정"</strong> 버튼을 클릭하여 정보를 수정할 수 있습니다.
          수정할 내용을 변경한 후, <strong>"저장"</strong> 버튼을 클릭하여 변경사항을 저장할 수 있습니다.
          수정된 데이터는 <strong>D-Day</strong> 기준으로 다시 정렬되어 나타납니다.
        </p>
      </section>

      <section className="description-section">
        <h2>5. 삭제</h2>
        <p>
          방문 항목 오른쪽에 있는 <strong>"삭제"</strong> 버튼을 클릭하면, 해당 정보를 삭제할 수 있습니다.
          삭제된 항목은 즉시 리스트에서 사라지며, 사용자에게 <strong>"삭제되었습니다."</strong>라는 알림이 표시됩니다.
        </p>
      </section>
    </div>
  );
}

export default Description;
