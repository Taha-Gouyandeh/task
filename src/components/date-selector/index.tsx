"use client";
import {FC, memo, useEffect, useState} from "react";
import moment from "jalali-moment";

const DateSelector: FC<{handleSelect: (date: string) => void}> = ({
  handleSelect,
}) => {
  const [day, setDay] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [year, setYear] = useState<string>();

  const handleGetYear = () => {
    const currentYear = moment().jYear();
    const startYear = currentYear;
    const yearRange = [];
    for (let index = startYear; index > currentYear - 100; index--) {
      yearRange.push(index);
    }

    return yearRange;
  };

  const handleGetMonth = () => {
    const month: {name: string; value: number}[] = [
      {name: "فروردین", value: 1},
      {name: "اردیبهشت", value: 2},
      {name: "خرداد", value: 3},
      {name: "تیر", value: 4},
      {name: "مرداد", value: 5},
      {name: "شهریور", value: 6},
      {name: "مهر", value: 7},
      {name: "آبان", value: 8},
      {name: "آذر", value: 9},
      {name: "دی", value: 10},
      {name: "بهمن", value: 11},
      {name: "اسفند", value: 12},
    ];

    return month;
  };

  useEffect(() => {
    if (day && month && year) {
      handleSelect(`${year}/${month}/${day}`);
    }
  }, [day, month, year]);

  return (
    <div className={"flex flex-row w-full h-full"}>
      <div className="w-1/3">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className={`border ${day && "border-green-700"} bg-white rounded w-full text-center cursor-pointer p-0.5 outline-0`}
        >
          <option hidden>روز</option>
          {[...Array(31)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="w-1/3 px-1">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className={`border ${month && "border-green-700"} bg-white rounded w-full text-center cursor-pointer p-0.5 outline-0`}
        >
          <option hidden>ماه</option>
          {handleGetMonth().map((monthItem, index) => (
            <option key={index} value={monthItem.value}>
              {monthItem.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-1/3">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className={`border ${year && "border-green-700"} bg-white rounded w-full text-center cursor-pointer p-0.5 outline-0`}
        >
          <option hidden>سال</option>
          {handleGetYear().map((yearItem, index) => (
            <option key={index} value={yearItem}>
              {yearItem}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default memo(DateSelector);
