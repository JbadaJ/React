// src/dataService.js

const LOCAL_STORAGE_KEY = "visitData";

const initialData = [
  {
    id: 1,
    name: "홍길동",
    phone: "010-1234-5678",
    address: "서울특별시 강남구",
    memo: "주기적인 방문 필요",
    lastVisit: "2024-12-10",
    visitDate: "2024-12-30",
  },
  {
    id: 2,
    name: "김철수",
    phone: "010-8765-4321",
    address: "서울특별시 서초구",
    memo: "긴급 점검 필요",
    lastVisit: "2024-11-20",
    visitDate: "2024-12-25",
  },
];

// 초기 데이터 로드: 로컬 스토리지에서 데이터 가져오기
const loadData = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : initialData;
};

// 데이터 저장: 로컬 스토리지에 데이터 저장
const saveData = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

// 현재 데이터 상태
let data = loadData();

export const getData = () => {
  return data;
};

export const addData = (newItem) => {
  const newId = Math.max(...data.map((item) => item.id)) + 1;
  const newData = { ...newItem, id: newId };
  data = [...data, newData];
  saveData(data); // 로컬 스토리지에 저장
  return newData;
};

export const updateData = (id, updatedItem) => {
  data = data.map((item) => (item.id === id ? { ...item, ...updatedItem } : item));
  saveData(data); // 로컬 스토리지에 저장
};

export const deleteData = (id) => {
  data = data.filter((item) => item.id !== id);
  saveData(data); // 로컬 스토리지에 저장
};
