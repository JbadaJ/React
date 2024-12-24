import React, { useState, useEffect } from "react";
import { getData, updateData, addData, deleteData } from "../dataService"; // dataService.js import
import "./List.css";

// 로컬 스토리지에서 데이터 가져오기
function loadDataFromLocalStorage() {
  const storedData = localStorage.getItem("data");
  return storedData ? JSON.parse(storedData) : [];
}

// 로컬 스토리지에 데이터 저장하기
function saveDataToLocalStorage(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

// 빈 칸 및 전화번호 형식 검증
function validateForm(item) {
  if (!item.name || !item.phone || !item.address || !item.visitDate) {
    return "모든 필드를 채워주세요!";
  }
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(item.phone)) {
    return "유효한 전화번호를 입력해주세요 (10~11자리 숫자)";
  }
  return null;
}

function calculateDdayValue(visitDate) {
  const today = new Date();
  const visit = new Date(visitDate);
  return Math.ceil((visit - today) / (1000 * 60 * 60 * 24)); // 숫자로 반환
}

function calculateDday(visitDate) {
  const ddayValue = calculateDdayValue(visitDate);
  return ddayValue > 0 ? `D-${ddayValue}` : `D+${Math.abs(ddayValue)}`;
}

function List() {
  const [data, setData] = useState(loadDataFromLocalStorage()); // 로컬 스토리지에서 초기 데이터 로드
  const [selectedItem, setSelectedItem] = useState(null); // 상세보기
  const [editItem, setEditItem] = useState(null); // 수정 모달
  const [newItem, setNewItem] = useState(null); // 추가 모달
  const [error, setError] = useState(""); // 오류 메시지 상태

  // 데이터 정렬: D-Day를 기준으로 정렬된 데이터를 반환
  const sortedData = [...data].sort(
    (a, b) => calculateDdayValue(a.visitDate) - calculateDdayValue(b.visitDate)
  );

  const handleDetail = (item) => setSelectedItem(item);

  const handleEdit = (item) => setEditItem(item);

  const handleDelete = (id) => {
    deleteData(id); // dataService의 deleteData 호출
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData); // 상태 직접 업데이트
    saveDataToLocalStorage(updatedData); // 로컬 스토리지에 업데이트된 데이터 저장
    alert("삭제되었습니다.");
  };

  const handleEditSubmit = () => {
    const validationError = validateForm(editItem); // 검증 함수 호출
    if (validationError) {
      setError(validationError); // 오류 메시지 상태 업데이트
      return; // 검증 실패 시 종료
    }
    const updatedData = data.map((item) =>
      item.id === editItem.id ? { ...item, ...editItem } : item
    );
    setData(updatedData);
    saveDataToLocalStorage(updatedData); // 로컬 스토리지에 업데이트된 데이터 저장
    setEditItem(null); // 모달 닫기
    setError(""); // 오류 메시지 초기화
    alert("수정되었습니다.");
  };

  const handleAddSubmit = () => {
    const validationError = validateForm(newItem); // 검증 함수 호출
    if (validationError) {
      setError(validationError); // 오류 메시지 상태 업데이트
      return; // 검증 실패 시 종료
    }
    const newId = Math.max(...data.map((item) => item.id), 0) + 1;
    const newData = { ...newItem, id: newId };
    const updatedData = [...data, newData];
    setData(updatedData); // 상태에 새 데이터 추가
    saveDataToLocalStorage(updatedData); // 로컬 스토리지에 새로운 데이터 저장
    setNewItem(null); // 추가 모달 닫기
    setError(""); // 오류 메시지 초기화
    alert("추가되었습니다.");
  };

  useEffect(() => {
    saveDataToLocalStorage(data); // 데이터가 변경될 때마다 로컬 스토리지에 저장
  }, [data]);

  return (
    <div className="container">
      <h1>방문 예정 목록</h1>
      <button
        className="add-button"
        onClick={() =>
          setNewItem({
            id: data.length + 1,
            name: "",
            phone: "",
            address: "",
            memo: "",
            lastVisit: "",
            visitDate: "",
          })
        }
      >
        추가
      </button>
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>D-Day</th>
            <th>이름</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{calculateDday(item.visitDate)}</td>
              <td>{item.name}</td>
              <td>
                <button
                  className="detail-button"
                  onClick={() => handleDetail(item)}
                >
                  상세보기
                </button>
                <button className="edit-button" onClick={() => handleEdit(item)}>
                  수정
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* 상세보기 모달 */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.name} 상세정보</h2>
            <p>
              <b>전화번호:</b> {selectedItem.phone}
            </p>
            <p>
              <b>주소:</b> {selectedItem.address}
            </p>
            <p>
              <b>메모:</b> {selectedItem.memo}
            </p>
            <p>
              <b>최근 방문:</b> {selectedItem.lastVisit}
            </p>
            <p>
              <b>방문 날짜:</b> {selectedItem.visitDate}
            </p>
            <button
              className="close-button"
              onClick={() => setSelectedItem(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {editItem && (
        <div className="modal-overlay" onClick={() => setEditItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editItem.name} 수정</h2>
            {error && <div className="error-message">{error}</div>}
            <label>
              이름:
              <input
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
              />
            </label>
            <label>
              전화번호:
              <input
                value={editItem.phone}
                onChange={(e) =>
                  setEditItem({ ...editItem, phone: e.target.value })
                }
              />
            </label>
            <label>
              주소:
              <input
                value={editItem.address}
                onChange={(e) =>
                  setEditItem({ ...editItem, address: e.target.value })
                }
              />
            </label>
            <label>
              메모:
              <textarea
                value={editItem.memo}
                onChange={(e) =>
                  setEditItem({ ...editItem, memo: e.target.value })
                }
              />
            </label>
            <label>
              방문 날짜:
              <input
                type="date"
                value={editItem.visitDate}
                onChange={(e) =>
                  setEditItem({ ...editItem, visitDate: e.target.value })
                }
              />
            </label>
            <div className="modal-buttons">
              <button className="save-button" onClick={handleEditSubmit}>
                저장
              </button>
              <button
                className="cancel-button"
                onClick={() => setEditItem(null)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 추가 모달 */}
      {newItem && (
        <div className="modal-overlay" onClick={() => setNewItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>새 방문 추가</h2>
            {error && <div className="error-message">{error}</div>}
            <label>
              이름:
              <input
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </label>
            <label>
              전화번호:
              <input
                value={newItem.phone}
                onChange={(e) =>
                  setNewItem({ ...newItem, phone: e.target.value })
                }
              />
            </label>
            <label>
              주소:
              <input
                value={newItem.address}
                onChange={(e) =>
                  setNewItem({ ...newItem, address: e.target.value })
                }
              />
            </label>
            <label>
              메모:
              <textarea
                value={newItem.memo}
                onChange={(e) =>
                  setNewItem({ ...newItem, memo: e.target.value })
                }
              />
            </label>
            <label>
              방문 날짜:
              <input
                type="date"
                value={newItem.visitDate}
                onChange={(e) =>
                  setNewItem({ ...newItem, visitDate: e.target.value })
                }
              />
            </label>
            <div className="modal-buttons">
              <button className="save-button" onClick={handleAddSubmit}>
                추가
              </button>
              <button
                className="cancel-button"
                onClick={() => setNewItem(null)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      width: "400px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      zIndex: 1001,
    },
    closeButton: {
      marginTop: "10px",
      padding: "10px 15px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    
  };
  
export default List;
